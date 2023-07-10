import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import type CSS from 'csstype';


//Conditionally render columns & set column widths.
//Based on 14 columns, the bookends of which are page margins (12 column layout)
function colClass(numCols:string){
    if (numCols === '1'){
        return "ofOne"
    }
    if (numCols === '2'){
        return "ofTwo"
    }
    if (numCols === '3'){
        return "ofThree"
    }
    if (numCols === '4'){
        return "ofFour"
    }
}

function colStyle(numCols: number, colNum: number, colWidth: string){
    
    var colConfig: CSS.Properties = { display:'none', }
        if (numCols < colNum ){ return colConfig; }
        if (numCols === 1) {
            colConfig = {gridColumn: '2 / span 12'}
            return colConfig;
        }
        if (numCols === 2 && colNum === 1){
            colConfig = { gridColumn:`2 / span ${colWidth}` }
            return colConfig;
        }
        if (numCols === 2 && colNum === 2){
            colConfig = { gridColumn: `${Number(colWidth) + 2} / span ${12 - Number(colWidth)}`}
            return colConfig;
        }
        if (numCols === 3 && colNum === 1){
            colConfig = {gridColumn: '2 / span 4'}
            return colConfig;
        }
        if (numCols === 3 && colNum === 2){
            colConfig = {gridColumn: '6 / span 4'}
            return colConfig;
        }
        if (numCols === 3 && colNum === 3){
            colConfig = {gridColumn: '10 / span 4'}
            return colConfig;
        }
        if (numCols === 4 && colNum === 1){
            colConfig = {gridColumn: '2 / span 3'}
            return colConfig;
        }
        if (numCols === 4 && colNum === 2){
            colConfig = {gridColumn: '5 / span 3'}
            return colConfig;
        }
        if (numCols === 4 && colNum === 3){
            colConfig = {gridColumn: '8 / span 3'}
            return colConfig;
        }
        if (numCols === 4 && colNum === 4){
            colConfig = {gridColumn: '11 / span 3'}
            return colConfig;
        }
        return;
}

function bandBg(color: string, img: string, op: string, textCol:string){
    var style:CSS.Properties;
    const opacity = Number(op);

    if (!img && !color){
        style = { background:'none',color:textCol};
    }
    else if (!img){
        style = { backgroundColor:color, color:textCol};        
    }
    else if (!color || !op){
        style = { backgroundImage:`url(${img})`, backgroundSize: 'cover', color:textCol };
    }
    else{
        const RGBs = color.substring(4,color.length-1).replace(/ /g,'').split(',');

        // using linear-background image so that we can overlay the background image with a semi-transparent solid color, impossible with backgroundImage
        style = {
            background:`linear-gradient(rgba(${Number(RGBs[0])},${Number(RGBs[1])},${Number(RGBs[2])},${opacity}),rgba(${Number(RGBs[0])},${Number(RGBs[1])},${Number(RGBs[2])},${Number(opacity)})),url('${img}')`, backgroundSize:'cover',color:textCol,
        };
    }
    return style;    
}

export default function FlexContent({ data }: {
    data: {
        title: string,
        numCols:string,
        colRatio:string,
        colOne: any,
        colTwo: any,
        colThree: any,
        colFour: any,
        background: {
            color: any, //resolve type error
            image: string,
            opacity:string,
            textColor: any,
        }
    }
}) {

    return (
        <section className="flexContent grid" style={bandBg(data.background?.color, data.background?.image, data.background?.opacity, data.background?.textColor)}>
            <h2 data-tina-field={tinaField(data.title)}>{data.title}</h2>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colOne')} style={colStyle(Number(data.numCols),1,data.colRatio)}>
                <TinaMarkdown content={data.colOne}/>
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colTwo')} style={colStyle(Number(data.numCols),2,data.colRatio)}>
                <TinaMarkdown content={data.colTwo} />
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colThree')} style={colStyle(Number(data.numCols),3,data.colRatio)}>
                <TinaMarkdown content={data.colThree}/>
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colFour')} style={colStyle(Number(data.numCols),4,data.colRatio)}>
                <TinaMarkdown content={data.colFour}/>
            </div>
        </section>
    );
};

export const flexContentBandSchema: Template = {
    name: 'flexContent',
    label: 'Flexible Content',
    ui:{
        itemProps: (item) => {
            // Field values are accessed by item?.<Field name>
            return { label: item?.title };
        },
        defaultItem:{
            numCols:'1',
            colRatio:'6',
            background:{
                opacity:'0',
            },
        },
    },
    fields: [
        {
            name:'title',
            type:'string',
            label:'Band Title',
            description:'Optional',
        },
        {
            name:'numCols',
            type:'string', // Has to be a string to properly support options
            label:'Number of Columns',
            description:"At smaller screen sizes, your columns might look like rows instead! This is to make sure your website looks good at all screen sizes.",
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
            description:'Only applicable to two-column layout',
            ui:{
                component:'button-toggle',
                direction:'vertical',
            },
            options: [
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
                    type:'string',
                    label:'Image Opacity',
                    description:'Tip: if your text is difficult to read, try setting the background color to black, the image opacity to 75%, and the text to a light color.',
                    ui:{
                        component:'button-toggle',
                    },
                    options: [
                        {
                            value:'0',
                            label:'100%',
                        },
                        {
                            value:'0.25',
                            label:'75%',
                        },
                        {
                            value:'0.5',
                            label:'50%',
                        },
                        {
                            value:'0.75',
                            label:'25%',
                        },
                    ],
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