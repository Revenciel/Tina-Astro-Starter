import type { Template } from "tinacms";


export default function Text({ data }: {
    data: {
        title: string,
        content: string,
    }
}) {

    return (
        <section>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </section>
    );
};

export const textBandSchema: Template = {
    name: 'textBand',
    label: 'Text Band',
    fields: [
        {
            name: 'title',
            type: 'string',
            label: 'Title'
        },
        {
            name: 'content',
            type: 'string',
            label: 'Content',
        }
    ],
};