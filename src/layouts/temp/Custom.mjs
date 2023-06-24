
import { useTina } from 'tinacms/dist/react';

// import { ReactNode } from "react";

export default function Layout(props) {

    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
      })

    return (
        <html lang="en">
            <head>
                <title>{props.pageTitle}</title>
            </head>
            <body>
                <h1>{props.pageTitle}</h1>
                <main>{props.children}</main>
            </body>
        </html>
    );
};