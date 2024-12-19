const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");


try {

  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: token });

  const pr_body = github.context.payload.pull_request.body;
  const pr_desc = pr_body.substring(
    pr_body.indexOf("## Describe your changes") + "## Describe your changes".length,
    pr_body.indexOf("## Checklist before requesting a review")
  ).trim();

  if (pr_desc) {
    core.setOutput("pr_desc");
    core.info("PR description is filled.");
  } else {
    const comment = await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: "PR description is not filled!"
    });
    core.setFailed("PR description is not filled!")
  }
} catch (error) {
  core.setFailed(error.message);
}
