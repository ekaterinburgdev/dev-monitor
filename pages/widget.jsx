import { useEffect } from "react";
import Home from "./";
import getAllRepoStats from "../github-api/get-all-repo-stats";

export default function Widget({ projectsData }) {
  useEffect(() => {
    const interval = setInterval(() => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "iframeHeight", height }, "*");
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Home
      projectsData={projectsData}
      isWidgetVersion
    />
  );
}

export async function getStaticProps() {
  return {
    props: {
      projectsData: await getAllRepoStats()
    },
    revalidate: 3600
  }
}

Widget.theme = "dark";
