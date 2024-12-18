const core = require('@actions/core');
const github = require('@actions/github');
const report = require('../report_utils/report');


try {

  const pr_body = github.context.payload.pull_request.body;
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes") + "## Describe your changes".length,
    pr_body.indexOf("## Checklist before requesting a review")
  ).trim();

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    const context = github.context;
    const github_token = process.env.GITHUB_TOKEN;
    context.token = github_token

    report.send(context, "PR description is not filled!");
    core.setFailed("PR description is not filled!")
  }
} catch (error) {
  core.setFailed(error.message);
}
