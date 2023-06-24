
import { useTina } from 'tinacms/dist/react';
import type { ReactNode } from "react";

// SOLUTION ONE:
// - Specifies props and types correctly in TypeScript
// - But does not successfully use the useTina hook
// - I couldn't figure out how to pass the props through the hook
interface Props {
    pageTitle: string;
    children: ReactNode;
}

export default function Layout({pageTitle, children}: Props) {

    return (
        <html lang="en">
            <head>
                <title>{pageTitle} + "|" sitetitleplaceholder</title>
            </head>
            <body>
                <h1>{pageTitle}</h1>
                <main>{children}</main>
            </body>
        </html>
    );
};

// SOLUTION THREE:
// - 
// - 
// - 
// interface Props {
//     pageTitle: string;
//     children: ReactNode;
// }

// export const Layout = (props: Props) => {
//     const { data } = useTina(props);

//     return (
//         <html lang="en">
//             <head>
//                 <title>{data.title} + "|" sitetitleplaceholder</title>
//             </head>
//             <body>
//                 <h1>{data.title}</h1>
//                 <main>{data.children}</main>
//             </body>
//         </html>
//     );
// };

// SOLUTION ????
// interface Props {
//     pageTitle: string;
//     children: ReactNode;
// }

// export default function Layout({props}: Props) {
//     const { data } = useTina({
//         query: props.query,
//         variables: props.variables,
//         data: props.data,
//       })

//     return (
//         <html lang="en">
//             <head>
//                 <title>{data.pageTitle} + "|" sitetitleplaceholder</title>
//             </head>
//             <body>
//                 <h1>{data.pageTitle}</h1>
//                 <main>{data.children}</main>
//             </body>
//         </html>
//     );
// };