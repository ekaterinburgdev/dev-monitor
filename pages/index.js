import projectsConfig from "../projects.config";
import { Dashboard } from "../components/Dashboard/Dashboard";
import getRepoStats from "../github-api/get-repo-stats";

function Home({ projectsData, isWidgetVersion = false }) {
  return (
    <Dashboard isWidgetVersion={isWidgetVersion} projectsData={projectsData} />
  )
}

export async function getStaticProps() {
  const projectsData = await Promise.all(
    projectsConfig.projects.map(async (project) => ({
      ...project,
      stats: await getRepoStats(project.git),
      revalidate: 3600
    })));

  return { props: { projectsData } }
}

export default Home;
