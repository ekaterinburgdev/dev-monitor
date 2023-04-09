import getPulls from "../../github-api/get-repo-pulls";

export default async function handler(req, res) {
  const { repo } = req.query;
  res.status(200).json(await getPulls(repo));
}
