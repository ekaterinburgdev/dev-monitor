import { Octokit } from "octokit";
import projectsConfig from "../../projects.config";

export default async function handler(req, res) {
  const { repo } = req.query;
  const owner = projectsConfig.organization;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const issuesData = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
  });

  const response = issuesData.data?.map((issue) => ({
    title: issue.title,
    url: issue.html_url,
    date: issue.updated_at,
    author: issue.user?.login,
    authorAvatar: issue.user?.avatar_url,
  }));

  res.status(200).json(response);
}
