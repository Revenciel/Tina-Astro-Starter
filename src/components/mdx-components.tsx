import type { Template } from "tinacms";

export const Components = {
  cta: props => {

    function newTab(bool){
      if (bool){
        return("_blank");
      }
      else {
        return("_self");
      }
    };

    return (
      <a href={props.url} className={"CTA " + props.style} target={newTab(props.newTab)}>
        {props.anchor}
      </a>
    );
  },
};

export const CtaSchema: Template = {
  name: "cta",
  label: "Call to action",
  ui: {
    defaultItem: {
      style: "Primary",
      text: "CTA",
    },
  },
  fields: [
    {
      type: "string",
      label: "Display Text",
      name: "anchor",
    },
    {
      type: "string",
      label: "Link URL",
      name: "url",
      description:'Tip: to link to a page on your website, enter a slash followed by the page file name. For example, "/news-and-events"',
    },
    {
      type: "string",
      label: "Style",
      name: "style",
      options: ["Primary", "Secondary"],
    },
    {
        type:"boolean",
        label:"Open link in new tab? (For external links, for example, a link to PayPal.)",
        name:"newTab",
    },
  ],
};