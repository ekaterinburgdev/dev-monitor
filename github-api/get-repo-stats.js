import { Octokit } from "octokit";
import projectsConfig from "../projects.config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function getRepoStats(repo) {
  const owner = projectsConfig.organization;

  const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  const activityData = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/commit_activity",
    {
      owner,
      repo,
    }
  );

  const contributorsData = await octokit.request(
    "GET /repos/{owner}/{repo}/contributors",
    {
      owner,
      repo,
    }
  );


  return {
    activity: activityData.data,
    contributors: contributorsData.data,
    repository: repoData.data,
  };
}
