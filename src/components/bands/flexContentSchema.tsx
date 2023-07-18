import type { Template } from "tinacms";
import { columnWidthToggle, flexColumn } from "../fieldComponents";
import { CtaSchema } from "../mdx-components";

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
                // component:'button-toggle',
                // direction:'vertical',
                component: columnWidthToggle,
            },
            options: [
                {
                    label:'1:2',
                    value:'4'
                },
                {
                    label:'1:1',
                    value:'6',
                },
                {
                    label:'2:1',
                    value:'8',
                },
            ],
        },
        {
            name: 'colOne',
            type: 'rich-text',
            label: 'First Column',
            templates: [
                CtaSchema,
              ],
        },
        {
            name: 'colTwo',
            type: 'rich-text',
            label: 'Second Column',
            ui:{
                component:flexColumn,
            },
            templates: [
                CtaSchema,
              ],
        },
        {
            name: 'colThree',
            type: 'rich-text',
            label: 'Third Column',
            ui:{
                component:flexColumn,
            },
            templates: [
                CtaSchema,
              ],
        },
        {
            name: 'colFour',
            type: 'rich-text',
            label: 'Fourth Column',
            ui:{
                component:flexColumn,
            },
            templates: [
                CtaSchema,
              ],
        },
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