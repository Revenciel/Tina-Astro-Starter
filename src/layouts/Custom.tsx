
//import { useTina } from 'tinacms/dist/react';

import type { ReactNode } from "react";

interface props {
    title: string;
    children: ReactNode;
}

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