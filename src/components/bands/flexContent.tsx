import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import type { CSSProperties } from "react";
import type CSS from 'csstype';

function hideCol(numCols: number, colNum: number){
    const hidden: CSS.Properties = { display:'none', }
        if (numCols < colNum ){ return hidden; }
}

function bandBg(color: string, img: string, op: number){
    var style:CSS.Properties;

    if (img === null){
        style = {
            backgroundColor:color,
        };
    }

    else if (op === null){
        style = {backgroundImage:`url(${img})`};
    }

    else{
        style = {
        background:`linear-gradient(rgba(0,0,0,${op}),rgba(255,255,255,${op})),url('${img}')`,
        };
    }

    return style;    
}

export default function FlexContent({ data }: {
    data: {
        numCols:string,
        colOne: string,
        colTwo: string,
        colThree: string,
        colFour: string,
        background: {
            color: string,
            image: string,
            opacity:number,
        }
    }
}) {

    return (
        <section className="flexContent" style={bandBg(data.background?.color, data.background?.image, data.background?.opacity)}>
            <div style={hideCol(Number(data.numCols),1)}>{data.colOne}</div>
            <div style={hideCol(Number(data.numCols),2)}>{data.colTwo}</div>
            <div style={hideCol(Number(data.numCols),3)}>{data.colThree}</div>
            <div style={hideCol(Number(data.numCols),4)}>{data.colFour}</div>
        </section>
    );
};

export const flexContentBandSchema: Template = {
    name: 'flexContent',
    label: 'Flexible Content',
    ui:{
        defaultItem:{
            numCols:'1',
        },
    },
    fields: [
        {
            name:'numCols',
            type:'string', // Has to be a string to properly support options
            label:'Number of Columns',
            ui: {
                component:'button-toggle',
            },
            // options only work with string values
            options: [ 
                {
                    label:"One",
                    value:'1',
                },
                {
                    label:"Two",
                    value:'2',
                },
                {
                    label:"Three",
                    value:'3',
                },
                {
                    label:"Four",
                    value:'4',
                },
            ]
        },
        {
            name: 'colOne',
            type: 'string',
            label: 'First Column'
        },
        {
            name: 'colTwo',
            type: 'string',
            label: 'Second Column',
        },
        {
            name: 'colThree',
            type: 'string',
            label: 'Third Column',
        },
        {
            name: 'colFour',
            type: 'string',
            label: 'Fourth Column',
        },
        // {
        //     name:'columnStyles',
        //     type:'object',
        //     label:'Column styles',
        //     fields[
        //         {

        //         }
        //     ],
        // },
        {
            name:'background',
            type:'object',
            label:'Choose a background color or image',
            fields:[
                {
                    //bg color
                    name:'color',
                    type:'string',
                    label:'Background Color',
                    ui: {
                        component: 'color',
                    },
                },
                {
                    //bg image
                    name:'image',
                    type:'image',
                    label:'Background Image',
                },
                {
                    //bg image opacity
                    name:'opacity',
                    type:'number',
                    label:'Background Image Opacity',
                    description:'If you use a background image, your text may look best by setting the background color to black, the image opacity to ~75%, and the text to light.',
                },
            ],
        },
    ],
};