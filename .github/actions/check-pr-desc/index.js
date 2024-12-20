const core = require('@actions/core');
const github = require('@actions/github');
const report = require('../report_utils/report');


try {

  const context = github.context;
  const github_token = process.env.GITHUB_TOKEN;
  context.token = github_token;

  const pull_request = github.context.payload.pull_request;

  // check pull request title mathes commit message pattern
  const pr_title = pull_request.title.trim();
  
  const task_pattern=/^((MW)|(KIT)|(STR)|(IN)|(MT)|(DEVOPS)|(CR)|(NF)|(IGP))-[0-9]+\. .+$/
  const release_pattern=/^(v[0-9]+\.[0-9]+\.[0-9]+(-rc)?)\. .+$/
  const hotfix_pattern=/^(v[0-9]+\.[0-9]+\.[0-9]+) ((MW)|(KIT)|(STR)|(IN)|(MT))-[0-9]+ (Hotfix\. ).+$/
  const merge_pattern=/^(Merge ).+$/

  const reg_expressions = [
    task_pattern,
    release_pattern,
    hotfix_pattern,
    merge_pattern
  ]

  var reg_exp_match = false;

  for (i = 0; i < reg_expressions.length; i++) {
    var reg_exp = reg_expressions[i];
    if (reg_exp.test(pr_title)) {
      reg_exp_match = true;
      break;
    }
  }

  if (!reg_exp_match) {
    const error_message = `PR Title is not mutch one of pattern: <br/> + <ul><li>${task_pattern}</li><li>${release_pattern}</li><li>${hotfix_pattern}</li><li>${merge_pattern}</li></ul>`;
    report.send(context, error_message);
    core.setFailed(error_message);
  }

  // check pull request description is not empty
  const pr_body = pull_request.body;
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes") + "## Describe your changes".length,
    pr_body.indexOf("## Checklist before requesting a review")
  ).trim();

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    const error_message = "PR description is not filled!"
    report.send(context, error_message);
    core.setFailed(error_message);
  }
} catch (error) {
  core.setFailed(error.message);
}
