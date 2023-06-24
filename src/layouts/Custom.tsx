
import { useTina } from 'tinacms/dist/react';
import { client } from '../../tina/__generated__/client';
import type { ReactNode } from "react";
import siteData from '../content/site-settings/index.json'

// APPROACH ONE:
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
                <title>{pageTitle} | {siteData.siteTitle}</title>
            </head>
            <body>
                <h1>{pageTitle}</h1>
                <main>{children}</main>
            </body>
        </html>
    );
};