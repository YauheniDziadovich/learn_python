const core = require('@actions/core');
const github = require('@actions/github');

try {

  const pr_body = github.context.payload.pull_request.body;
  console.log(`Pr body: ${pr_body}`);
  
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes"),
    pr_body.indexOf("## Checklist before requesting a review")
  );

  console.log(`PR descr: ${pr_desc}`);

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    core.setFailed("PR description is not filled!")
  }
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
