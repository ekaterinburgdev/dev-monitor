import { useEffect } from "react";
import Home from "./";

export default function Widget() {
  useEffect(() => {
    const interval = setInterval(() => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "iframeHeight", height }, "*");
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Home isWidgetVersion />;
}

Widget.theme = "dark";
