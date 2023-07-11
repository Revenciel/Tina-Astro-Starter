import { TextField, ReferenceField, ButtonToggle } from "tinacms";
import React from "react";
import { MdxFieldPlugin } from "tinacms";
// ********** REUSABLE FIELD COMPONENTS **********



// ********** NON-REUSABLE FIELD COMPONENTS **********
// These were made for conditionally rendering fields on specific components or documents

export const internalLink = (props) => {
  const typeOfLink = React.useMemo(() => {
    let fieldName = props.field.name;
    fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
    return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values)
      .linkType;
  }, [props.tinaForm.values]);

  if (typeOfLink !== "internal") {
    return null;
  }
  return ReferenceField(props);
};

export const externalLink = (props) => {

  const typeOfLink = React.useMemo(() => {
    let fieldName = props.field.name;
    fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
    return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values)
      .linkType;
  }, [props.tinaForm.values]);

  if (typeOfLink !== "external") {
    return null;
  }
  return TextField(props);
};

export const columnWidthToggle = (props) => {
  const numberOfCols = React.useMemo(() => {
    let fieldName = props.field.name;
    fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
    return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).numCols;

  }, [props.tinaForm.values]);

  if (numberOfCols !== '2'){
    return null;
  }
  return (<>
  <label htmlFor={props.field.name} className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined">Ratio of Column Widths</label>
  
  {ButtonToggle(props)}<br /></>);
};

export const flexColumn = (props) => {

  /* Determine current column number  */
  console.log(props.field.name);
  // const colNumString = props.field.name.substring(props.field.name.lastIndexOf('.')+1);

  const colNumString = React.useMemo(() => {
    return (props.field.name.substring(props.field.name.lastIndexOf('.')+1));
  }, [props.tinaForm.values])
  let colNum;
  if (colNumString === "colTwo"){
    colNum = 2;
  }
  if (colNumString === "colThree"){
    colNum = 3;
  }
  if (colNumString === "colFour"){
    colNum = 4;
  }

  const numberOfCols = React.useMemo(() => {
    let fieldName = props.field.name;
    fieldName = fieldName.substring(0, fieldName.lastIndexOf(".")) || fieldName;
    return fieldName.split(".").reduce((o, i) => o[i], props.tinaForm.values).numCols;

  }, [props.tinaForm.values]);

  if (!colNum || colNum > numberOfCols){
    return null;
  }
  return <MdxFieldPlugin.Component {...props} /> ;
};

