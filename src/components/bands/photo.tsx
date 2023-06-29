import type { Template } from "tinacms";

export default function Photo({ data }: {
    data: {
        photo: string
    }
}) {

    return (
        <section>
           <img src={data.photo}/>
        </section>
    );
};

export const photoBandSchema: Template = {
    name: 'photoBand',
    label: 'Photo Band',
    fields: [
        {
            name: 'photo',
            type: 'image',
            label: 'Photo'
        },
    ],
};