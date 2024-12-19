const core = require('@actions/core');
const github = require('@actions/github');

try {
  const pr_body = github.context.payload.pull_request.body;
  const assignees = pr_body.assignees;
  const assignee = pr_body.assignee;
  
  console.log("assignees " + assignees);
  console.log("assignee " + assignees);


  if (assignee || assignees) {
    core.setOutput("pr_desc");
    core.info("PR assignee is not empty.");
  } else {
    core.setFailed("PR assignee is empty.")
  }

} catch (error) {
  core.setFailed(error.message);
}
