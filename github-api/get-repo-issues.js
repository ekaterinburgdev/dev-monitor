import { Octokit } from "octokit";
import projectsConfig from "../projects.config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function getIssues(repo) {
  const owner = projectsConfig.organization;

  const issuesData = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
  });

  return issuesData.data?.map((issue) => ({
    title: issue.title,
    url: issue.html_url,
    date: issue.updated_at,
    author: issue.user?.login,
    authorAvatar: issue.user?.avatar_url,
  }));
}
