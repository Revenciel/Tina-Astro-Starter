import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type CSS from 'csstype';
import { Components } from "../mdx-components";


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
                <TinaMarkdown content={data.colOne} components={Components}/>
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colTwo')} style={colStyle(Number(data.numCols),2,data.colRatio)}>
                <TinaMarkdown content={data.colTwo} components={Components}/>
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colThree')} style={colStyle(Number(data.numCols),3,data.colRatio)}>
                <TinaMarkdown content={data.colThree} components={Components}/>
            </div>
            <div className={"column " + colClass(data.numCols)} data-tina-field={tinaField(data, 'colFour')} style={colStyle(Number(data.numCols),4,data.colRatio)}>
                <TinaMarkdown content={data.colFour} components={Components}/>
            </div>
        </section>
    );
};