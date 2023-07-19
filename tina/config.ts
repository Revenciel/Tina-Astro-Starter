import { defineConfig } from "tinacms";
import { photoBandSchema } from "../src/components/bands/photo";
import { textBandSchema } from "../src/components/bands/text";
import { flexContentBandSchema } from "../src/components/bands/flexContentSchema";
import { externalLink, internalLink } from "../src/components/fieldComponents";

// Your hosting provider likely exposes this as an environment variable
// const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch: "master",
  clientId: process.env.PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "siteConfig",
        label: "Site Settings",
        path: "src/content/site-settings",
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          filename: {
            readonly: true,
          },
          global: true,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Website Title",
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
          {
            type: "image",
            name: "favicon",
            label: "Favicon",
            description: "The favicon is the small icon that appears on the browser tab. It is usually the logo, or a simplified version of the logo.",
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline or Motto",
          },
          {
            type: "object",
            label: "Menu Links",
            name: "navLinks",
            description: "If you delete a page that is linked in this menu, you must also delete or update the menu link here!",
            list: true,
            ui: {
              itemProps: (item) => {
                if (item.linkType === "internal"){
                  if (item?.relativePath != null){
                    var pageName = item?.relativePath
                    .substring(0,item?.relativePath.lastIndexOf("."))
                  .split("/");
                  pageName = pageName[pageName.length - 1];
                  return {label: pageName};
                  }
                  return{label: "Menu Link"}
                }
                if (item?.anchor == null){
                  return{label: "Menu Link"}
                }
                return { label: item?.anchor };
              },
              defaultItem: {
                linkType: "internal",
              },
            },

            fields: [
              {
                type: "string",
                name: "linkType",
                label: "Destination",
                description: "Is this link internal (goes to a page on your website) or external (goes to a different website)?",
                options: [
                  {
                    label: "Internal",
                    value: "internal"
                  },
                  {
                    label: "External",
                    value: "external",
                  },
                ],
                ui: {
                  component: "button-toggle",
                },
              },
              {
                type: "reference",
                name: "relativePath",
                label: "Page to link to",
                collections: ['page'],
                ui: {
                  component: internalLink,
                },
              },
              {
                type: "string",
                name: "url",
                label: "Link URL",
                ui: {
                  component: externalLink,
                },
              },
              {
                type: "string",
                name: "anchor",
                label: "Display Text",
              },
            ],
          },
          {
            type:'object',
            name:'cta',
            label:'Call to Action',
            description:'Optional',
            fields:[
              {
                name:'url',
                label:'Link URL',
                type:'string',
                required:true,
              },
              {
                name:'anchor',
                label:'Display Text',
                type:'string',
                required:true,
              },
              {
                name:'isExternal',
                label:'Does this link go to an external website (e.g., PayPal?)',
                type:'boolean',
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages/",
        format: 'mdx',
        ui: {
          filename: {
            slugify: values => {
              if (values?.parentPage){
                //18 is character index to remove src/content/pages/
                return values.parentPage.substring(18).replace('.mdx','') + '/' + `${values?.title?.toLowerCase().replace(/[^a-zA-Z\d_\-\s]/g, '').replace(/\s/g, '-',)}`
              };

              return `${values?.title?.toLowerCase().replace(/[^a-zA-Z\d_\-\s]/g, '').replace(/\s/g, '-',)}`
            },
          },
          router: ({ document }) => {
            return "/" + document._sys.relativePath.replace('.mdx','');
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description: "The title of the page.",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "parentPage",
            label: "Parent Page",
            collections: ['page'],
            description:'Optional - if you want this page categorized under another page.',
            ui: {
              component: 'hidden', //REMOVE THIS LINE TO ALLOW USERS TO SELECT PARENT PAGES. SEE NOTE IN README.
            }
          },
          {
            type: "object",
            list: true,
            name: "bands",
            label: "Page Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              // add templates here
              flexContentBandSchema,
              photoBandSchema,
              textBandSchema,
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            description: "The date this post was originally created.",
            required: true,
            ui: {
              dateFormat: "DD MMMM YYYY"
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            required: true,
            isBody: true,
          },
          {
            type: "datetime",
            name: "editDate",
            label: "Edit Date",
            description: "The date this post was updated (if edited after the publish date).",
            ui: {
              dateFormat: "DD MMMM YYYY"
            },
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: '86cc5b92c765fd2689f850be3d816b5ac2cb6d80',
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },

});
