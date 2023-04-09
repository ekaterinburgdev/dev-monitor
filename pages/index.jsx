import { Dashboard } from "../components/Dashboard/Dashboard";
import getAllRepoStats from "../github-api/get-all-repo-stats";

function Home({ projectsData, isWidgetVersion = false }) {
  return (
    <Dashboard
      projectsData={projectsData}
      isWidgetVersion={isWidgetVersion}
    />
  )
}

export async function getStaticProps() {
  return {
    props: {
      projectsData: await getAllRepoStats()
    },
    revalidate: 3600,
  }
}

export default Home;
