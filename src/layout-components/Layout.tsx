import { useTina, tinaField } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";
import { Bands } from "../components/bands";

export default function Layout({ props }: { props: TinaProps }) {
  const { data } = useTina(props);

  return (
    <main>
        <h2 data-tina-field={tinaField(data.page, 'title')}>{data.page.title}</h2>
        <Bands {...data.page}></Bands>
      </main>
  );
}
