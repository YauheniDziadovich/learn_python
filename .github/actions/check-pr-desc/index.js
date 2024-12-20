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
  console.log("PR title");
  const task_pattern='^((MW)|(KIT)|(STR)|(IN)|(MT)|(DEVOPS)|(CR)|(NF)|(IGP))-[0-9]+\. .+$'
  const release_pattern='^(v[0-9]+\.[0-9]+\.[0-9]+(-rc)?)\. .+$'
  const hotfix_pattern='^(v[0-9]+\.[0-9]+\.[0-9]+) ((MW)|(KIT)|(STR)|(IN)|(MT))-[0-9]+ (Hotfix\. ).+$'
  const merge_pattern='^(Merge ).+$'



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
    report.send(context, "PR description is not filled!");
    core.setFailed("PR description is not filled!");
  }
} catch (error) {
  core.setFailed(error.message);
}
