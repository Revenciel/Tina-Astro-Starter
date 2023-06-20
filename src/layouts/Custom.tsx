export default function Layout(props) {
    return (
        <html lang="en">
            <head></head>
            <body>
                <h1>{props.title}</h1>
                <main>{props.children}</main>
            </body>
        </html>
    );
};

// export interface Props {
//     title: string;
//   }

// export default function Layout({title}: Props) {
//     return (
//         <html lang="en">
//             <head></head>
//             <body>
//                 <h1>{title}</h1>
//                 <slot />
//             </body>
//         </html>
//     );
// };