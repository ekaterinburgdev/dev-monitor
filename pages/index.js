import { useState, useEffect } from "react";
import Head from "next/head";
import projectsConfig from "../projects.config";
import { Dashboard } from "../components/Dashboard/Dashboard";
import useInterval from "../utils/useInterval";

function Home() {
  const [projectsData, setProjectsData] = useState(projectsConfig.projects);

  const updateProjectsData = async () => {
    const projectsData = await Promise.all(
      projectsConfig.projects.map(async (project) => {
        return {
          ...project,
          stats: await loadStats(project.git),
          slots: await loadSlots(project.git, project.vercel),
        };
      })
    );

    setProjectsData(projectsData);
  };

  useEffect(() => {
    updateProjectsData();
  }, []);

  useInterval(() => {
    updateProjectsData();
  }, 120000);

  return (
    <>
      <Head>
        <title>Ekaterinburg.dev Projects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Dashboard projectsData={projectsData} />
    </>
  );
}

async function loadStats(repo) {
  const response = await fetch(`/api/repo-stats?repo=${repo}`);
  return await response.json();
}

async function loadSlots(repo, vercel) {
  const response = await fetch(`/api/slots?repo=${repo}&vercel=${vercel}`);
  return await response.json();
}

export default Home;
