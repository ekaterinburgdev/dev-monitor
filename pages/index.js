import { useState, useEffect } from "react";
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

  return <Dashboard projectsData={projects} />;
}

async function loadRepoInfo(repo) {
  const response = await fetch(`/api/repository?repo=${repo}`);
  return await response.json();
}

export default Home;
