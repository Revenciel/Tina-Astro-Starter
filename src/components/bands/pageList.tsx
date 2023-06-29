import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import React from "react";
import client from "../../../tina/__generated__/client";
import type { PageConnectionEdges } from "../../../tina/__generated__/types";

// Attempt to make list of pages show:
// export default function List({ data }: any) {

//     const pages = data.pageConnection.edges;

//     return (
//         <ul>
//            {pages.map((page: any) => {
//             return (
//                 <li><a href={page._sys.filename}>{page.title}</a></li>
//             )
//            })}
//         </ul>
//     );
// };

// Placeholder function, until the above function works:
export default function List({ data }: {
    data: {
        test: string
    }
}) {
    return (
        <section>
           <p>{data.test}</p>
        </section>
    );
};

export const listBandSchema: Template = {
    name: 'listBand',
    label: 'List Band',
    fields: [
        {
            name: 'test',
            type: 'string',
            label: "This doesn't matter right now"
        },
    ],
};