import { useTina } from "tinacms/dist/react";
import type { TinaProps } from "../types";
import { Bands } from "../components/bands";

export default function Layout({ props }: { props: TinaProps }) {
  const { data } = useTina(props);

  return (
    <main>
        <Bands {...data.page}></Bands>
      </main>
  );
}
