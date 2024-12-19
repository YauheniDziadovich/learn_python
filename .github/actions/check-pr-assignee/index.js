const core = require('@actions/core');
const github = require('@actions/github');

try {
  const c = github.context.token

  console.log("TOKEN: " + c);

  const pr_props = github.context.payload.pull_request;
  const assignees = pr_props.assignees;
  const assignee = pr_props.assignee;

  if (assignee != null || (assignees != undefined && assignees.lenght > 0)) {
    core.setOutput("pr_desc");
    core.info("PR assignee is not empty.");
  } else {
    core.setFailed("PR assignee is empty.")
  }

} catch (error) {
  core.setFailed(error.message);
}
