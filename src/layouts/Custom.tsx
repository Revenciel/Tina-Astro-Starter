import { useTina } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";

export default function Layout({ props }: { props: TinaProps }) {
  const { data } = useTina(props);

  return (
    <html lang="en">
      <head>
        <title>
          {`${data.page.title} | ${siteData.siteTitle}`}
        </title>
      </head>
      <body>
        <h1>{data.page.title}</h1>
        <main>{data.page.body}</main>
      </body>
    </html>
  );
}
