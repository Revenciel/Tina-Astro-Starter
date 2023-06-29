import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

export default function Photo({ data }: {
    data: {
        photo: string
    }
}) {

    return (
        <section>
           <img data-tina-field={tinaField(data, 'photo')} src={data.photo}/>
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