import getIssues from "../../github-api/get-repo-issues";

export default async function handler(req, res) {
  const { repo } = req.query;
  res.status(200).json(await getIssues(repo));
}
