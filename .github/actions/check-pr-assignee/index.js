const core = require('@actions/core');
const github = require('@actions/github');

try {
  const pr_props = github.context.payload.pull_request;
  const assignees = pr_props.assignees;
  const assignee = pr_props.assignee;
  
  console.log("assignees " + assignees);
  console.log("assignee " + assignees);
  console.log("assignee " + assignees);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);


  if (assignee || (assignees != undefined && assignees.lenght > 0)) {
    core.setOutput("pr_desc");
    core.info("PR assignee is not empty.");
  } else {
    core.setFailed("PR assignee is empty.")
  }

} catch (error) {
  core.setFailed(error.message);
}
