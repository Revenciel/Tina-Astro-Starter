import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import type CSS from 'csstype';



function hideCol(numCols: number, colNum: number){
    const hidden: CSS.Properties = { display:'none', }
        if (numCols < colNum ){ return hidden; }
}

function colOneWidth(width:string){
    var w = Number(width);
    if (w = 3){
        return "xsm";
    }
    if (w = 4){
        return "sm";
    }
    if (w = 6){
        return "med";
    }
    if (w = 8){
        return "lg";
    }
    return "xlg";
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
        colRatio:string,
        colOne: any,
        colTwo: any,
        colThree: any,
        colFour: any,
        background: {
            color: any, //resolve type error
            image: string,
            opacity:number,
            textColor: any,
        }
    }
}) {

    return (
        <section className="flexContent grid" style={bandBg(data.background?.color, data.background?.image, data.background?.opacity, data.background?.textColor)}>
            <div className={colOneWidth(data.colRatio)}data-tina-field={tinaField(data, 'colOne')}>
                <TinaMarkdown content={data.colOne}/>
            </div>
            <div data-tina-field={tinaField(data, 'colTwo')} style={hideCol(Number(data.numCols),2)}>
                <TinaMarkdown content={data.colTwo} />
            </div>
            <div data-tina-field={tinaField(data, 'colThree')} style={hideCol(Number(data.numCols),3)}>
                <TinaMarkdown content={data.colThree}/>
            </div>
            <div data-tina-field={tinaField(data, 'colFour')} style={hideCol(Number(data.numCols),4)}>
                <TinaMarkdown content={data.colFour}/>
            </div>
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
                component: 'button-toggle',
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
            name: 'colRatio',
            type: 'string',
            label: 'Column Ratio',
            ui:{
                component:'button-toggle',
                direction:'vertical',
            },
            options: [
                {
                    label:'[---] [---------]',
                    // number of columns 1st column should take up, out of 12 columns
                    value:'3',
                },
                {
                    label:'[----] [--------]',
                    value:'4'
                },
                {
                    label:'[------] [------]',
                    value:'6',
                },
                {
                    label:'[--------] [----]',
                    value:'8',
                },
                {
                    label:'[---------] [---]',
                    value:'9',
                },
            ],
        },
        {
            name: 'colOne',
            type: 'rich-text',
            label: 'First Column',
        },
        {
            name: 'colTwo',
            type: 'rich-text',
            label: 'Second Column',
            
        },
        {
            name: 'colThree',
            type: 'rich-text',
            label: 'Third Column',
        },
        {
            name: 'colFour',
            type: 'rich-text',
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
                        colorFormat: 'rgb',
                        widget: 'block',
                        //colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
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
                    description:'Tip: if your text is difficult to read, try setting the background color to black, the overlay opacity to 0.25, and the text to a light color.',
                },
                {
                    name:'textColor',
                    type:'string',
                    label:'Text Color',
                    ui:{
                        component:'color',
                        widget:'block',
                        //colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
                    },
                },
            ],
        },
    ],
};