import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import type { CSSProperties } from "react";
import type CSS from 'csstype';
import type { ColorFieldProps } from "tinacms";

function hideCol(numCols: number, colNum: number){
    const hidden: CSS.Properties = { display:'none', }
        if (numCols < colNum ){ return hidden; }
}

function bandBg(color: string, img: string, op: number, textCol:string){
    var style:CSS.Properties;

    if (!img && !color){
        style = { background:'none',color:textCol};
    }
    else if (!img){
        style = { backgroundColor:color, color:textCol};        
    }
    else if (!color || !op){
        style = { backgroundImage:`url(${img})`, color:textCol };
    }
    else{
        const RGBs = color.substring(4,color.length-1).replace(/ /g,'').split(',');

        // using linear-background image so that we can overlay the background image with a semi-transparent solid color, impossible with backgroundImage
        style = {
            background:`linear-gradient(rgba(${Number(RGBs[0])},${Number(RGBs[1])},${Number(RGBs[2])},${op}),rgba(${Number(RGBs[0])},${Number(RGBs[1])},${Number(RGBs[2])},${op})),url('${img}')`, color:textCol,
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
            color: any, //resolve type error
            image: string,
            opacity:number,
            textColor: any,
        }
    }
}) {

    return (
        <section className="flexContent" style={bandBg(data.background?.color, data.background?.image, data.background?.opacity, data.background?.textColor)}>
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
            background:{
                opacity:0.25,
            },
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
            ui:{
                // defaultItem:{
                //     opacity:0.5,
                // },
            },
            fields:[
                {
                    //bg color
                    name:'color',
                    type:'string',
                    label:'Background Color',
                    ui: {
                        component: 'color',
                        colorFormat: 'rgb',
                        //colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
                        widget: 'block',
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
                    label:'Background Overlay Opacity',
                    description:'If you use a background image, your text may look best by setting the background color to black, the image opacity to ~0.25, and the text to light.',
                },
                {
                    name:'textColor',
                    type:'string',
                    label:'Text Color',
                    ui:{
                        component:'color',
                        widget:'block',
                    },
                },
            ],
        },
    ],
};