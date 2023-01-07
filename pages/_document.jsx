/* eslint-disable @next/next/no-title-in-document-head */
import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = "https://projects.ekaterinburg.dev/";
  const siteTitle = "Ekaterinburg.dev Projects";
  const siteDescription = "Description";
  const ogTitle = "Ekaterinburg.dev Projects";
  const ogImage = `${siteUrl}og-preview.jpg`;

  return (
    <Html lang="ru">
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="var(--bg-color)" />
        <meta name="description" content={siteDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={ogTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={ogImage} />

        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="dns-prefetch" href="https://mc.yandex.ru/" />
        <link rel="dns-prefetch" href="https://tile.osmand.net/" /> */}
        {/* <meta name="yandex-verification" content="???" />
        <meta name="facebook-domain-verification" content="???" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: '????',
                    }}
                /> */}
      </body>
    </Html>
  );
}
