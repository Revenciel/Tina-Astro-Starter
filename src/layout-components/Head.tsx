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
    <link rel="stylesheet" href="/stylesheet.css" />
  </head>
  );
}
