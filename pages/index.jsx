import { Dashboard } from "../components/Dashboard/Dashboard";
import getAllRepoStats from "../github-api/get-all-repo-stats";

function Home({ projectsData }) {
  return (
    <Dashboard
      projectsData={projectsData}
      isWidgetVersion={false}
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
