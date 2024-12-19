const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");


try {

  const token = context.token;

  console.log("Token: " + token);
  
  // const octokit = new Octokit({ auth: token });

  const pr_body = github.context.payload.pull_request.body;
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes") + "## Describe your changes".length,
    pr_body.indexOf("## Checklist before requesting a review")
  ).trim();

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    // octokit.request(
    //   'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    //   {
    //     owner: context.repo.owner,
    //     repo: context.repo.repo,
    //     issue_number: context.issue.number,
    //     body: "PR description is not filled!"
    //   }
    // );
    core.setFailed("PR description is not filled!")
  }
} catch (error) {
  core.setFailed(error.message);
}
