import { Octokit } from "octokit";
import projectsConfig from "../../projects.config";

export default async function handler(req, res) {
  const { repo, vercel } = req.query;
  const owner = projectsConfig.organization;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const pulls = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls{?state,head,base,sort,direction,per_page,page}",
    {
      owner,
      repo,
    }
  );

  const result = pulls.data
    ?.map((pull) => {
      const slotSuffix = pull.head.ref.replace(/\//g, "-");
      const slotUrl = `https://${vercel}-${slotSuffix}.vercel.app`;

      return {
        branch: slotSuffix,
        slotUrl,
        date: pull.updated_at,
        commitUrl: pull.html_url,
        commitMessage: pull.title,
        commitAuthor: pull.user?.login,
      };
    })
    .sort((a, b) => a.date - b.date);

  res.status(200).json(result);
}
