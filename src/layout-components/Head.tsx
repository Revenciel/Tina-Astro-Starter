import { useTina } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";

export default function Head({ props }: { props: TinaProps }) {
  const { data } = useTina(props);

  return (
    <head>
      <title>
        {`${data.page.title} | ${siteData.title}`}
      </title>
      <link rel="icon" href={siteData.favicon} />
      <link rel="stylesheet" href="/stylesheet.css" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
    </head>
  );
}
