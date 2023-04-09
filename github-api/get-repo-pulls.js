import { Octokit } from "octokit";
import projectsConfig from "../projects.config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = projectsConfig.organization;

export default async function getPulls(repo) {
  const pullsData = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
  });

  return pullsData.data?.map((pull) => ({
    title: pull.title,
    url: pull.html_url,
    date: pull.updated_at,
    author: pull.user?.login,
    authorAvatar: pull.user?.avatar_url,
    reviewers: pull.requested_reviewers,
  }));
}
