import { useState, useEffect } from "react";
import Head from "next/head";
import projectsConfig from "../projects.config";
import { Dashboard } from "../components/Dashboard/Dashboard";

function Home() {
  const [projects, setProjectsData] = useState(projectsConfig.projects);
  const [loaded, setLoaded] = useState(false);

  const init = async () => {
    if (loaded) return;

    const projectsData = await Promise.all(
      projectsConfig.projects.map(async (project) => {
        return {
          ...project,
          stats: await loadRepoInfo(project.git),
        };
      })
    );

    setProjectsData(projectsData);
    setLoaded(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Ekaterinburg.dev Projects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="var(--bg-color)" />
      </Head>

      <Dashboard projectsData={projects} />
    </>
  );
}

async function loadRepoInfo(repo) {
  const response = await fetch(`/api/repository?repo=${repo}`);
  return await response.json();
}

export default Home;
