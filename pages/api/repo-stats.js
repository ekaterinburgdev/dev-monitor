import { Octokit } from "octokit";
import projectsConfig from "../../projects.config";

export default async function handler(req, res) {
  const { repo } = req.query;
  const owner = projectsConfig.organization;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  const pullsData = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
  });

  const contributorsData = await octokit.request(
    "GET /repos/{owner}/{repo}/contributors",
    {
      owner,
      repo,
    }
  );

  res.status(200).json({
    repo: repoData.data,
    contributors: contributorsData.data,
    issues: repoData.data.open_issues_count,
    pulls: pullsData.data.length,
  });
}
