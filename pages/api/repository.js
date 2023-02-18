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

  const pullsData = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
  });

  res.status(200).json({
    activity: activityData.data,
    contributors: contributorsData.data,
    repository: repoData.data,
    pulls: pullsData.data?.map((pull) => ({
      title: pull.title,
      url: pull.html_url,
      date: pull.updated_at,
      author: pull.user?.login,
      authorAvatar: pull.user?.avatar_url,
      reviewers: pull.requested_reviewers,
    })),
  });
}
