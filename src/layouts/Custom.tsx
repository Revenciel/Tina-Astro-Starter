
//import { useTina } from 'tinacms/dist/react';

// ISSUE:
// When I uncomment the useTina import, I get an error:
// "Cannot use import statement outside a module"
// "[vite] Error when evaluating SSR module /src/layouts/Custom.tsx: failed to import "tinacms/dist/react"

// Otherwise, this code works as I expect.
// However, I need to import useTina to set up visual editing.

import type { ReactNode } from "react";

interface props {
    title: string;
    children: ReactNode;
}

// QUESTION:
// what is a "ReactNode"? I put that as the type because of a VS code error that I didn't understand

export default function Layout({title, children}: props) {
//export default function Layout(props: any) {

    // const { data } = useTina({
    //     query: props.query,
    //     variables: props.variables,
    //     data: props.data,
    //   })

    return (
        <html lang="en">
            <head></head>
            <body>
                <h1>{title}</h1>
                <main>{children}</main>
            </body>
        </html>
    );
};