import { TextField, ReferenceField } from "tinacms";
import React from "react";

export const internalLink = (props) => {
  console.log(props);
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
