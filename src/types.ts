import type { PageQuery } from "../tina/__generated__/types";

export interface TinaProps {
  data: PageQuery;
  query: string;
  variables: {
    relativePath: string;
  };
}
