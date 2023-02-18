import { Octokit } from "octokit";
import projectsConfig from "../../projects.config";

export default async function handler(req, res) {
  const { repo } = req.query;
  const owner = projectsConfig.organization;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const pullsData = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
  });

  const response = pullsData.data?.map((pull) => ({
    title: pull.title,
    url: pull.html_url,
    date: pull.updated_at,
    author: pull.user?.login,
    authorAvatar: pull.user?.avatar_url,
    reviewers: pull.requested_reviewers,
  }));

  res.status(200).json(response);
}
