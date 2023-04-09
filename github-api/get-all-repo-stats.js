import projectsConfig from "../projects.config";
import getRepoStats from "./get-repo-stats";

export default async function getAllRepoStats() {
    return await Promise.all(
        projectsConfig.projects.map(async (project) => ({
            ...project,
            stats: await getRepoStats(project.git),
        }))
    );
}
