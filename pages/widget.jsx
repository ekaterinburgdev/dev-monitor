import { useEffect } from "react";
import Home from "./";

export default function Widget() {
  useEffect(() => {
    setTimeout(() => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "iframeHeight", height }, "*");
    }, 1000);
  }, []);
  return <Home isWidgetVersion />;
}

Widget.theme = "dark";
