const core = require('@actions/core');
const github = require('@actions/github');

try {

  const pr_body = github.context.payload.pull_request.body;
  console.log(`Pr body: ${pr_body}`);
  
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes") + "## Describe your changes".length,
    pr_body.indexOf("## Checklist before requesting a review")
  ).trim();

  console.log(`PR descr: ${pr_desc}, length: ${pr_body.length}`);

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    core.setFailed("PR description is not filled!")
  }
} catch (error) {
  core.setFailed(error.message);
}
