import { ThemeProvider } from "next-themes";
import "../styles/colors.css";
import "../styles/globals.css";
import "../styles/font.css";
import "../styles/tabs.css";
import "../styles/modal.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || null}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
