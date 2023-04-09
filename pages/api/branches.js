import getRepoBranches from "../../github-api/get-repo-branches";

export default async function handler(req, res) {
  const { repo, vercel } = req.query;
  res.status(200).json(await getRepoBranches(repo, vercel));
}
