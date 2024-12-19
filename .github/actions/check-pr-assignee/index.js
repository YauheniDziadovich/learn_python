const core = require('@actions/core');
const github = require('@actions/github');

const { Octokit } = require("@octokit/rest");

try {
  const pr_props = github.context.payload.pull_request;
  const assignees = pr_props.assignees;
  const assignee = pr_props.assignee;

  if (assignee != null || (assignees != undefined && assignees.lenght > 0)) {
    core.setOutput("pr_desc");
    core.info("PR assignee is not empty.");
  } else {

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });
    
    const context = github.context;
    const response = await octokit.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: "test message",
    });
    core.setFailed("PR assignee is empty.")
  }

} catch (error) {
  core.setFailed(error.message);
}
