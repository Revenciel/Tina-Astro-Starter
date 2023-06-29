import { defineConfig } from "tinacms";
import { photoBandSchema } from "../src/components/bands/photo";
import { textBandSchema } from "../src/components/bands/text";
import { listBandSchema } from "../src/components/bands/pageList";

// Your hosting provider likely exposes this as an environment variable
// const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch:"master",
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
        format:'json',
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
            name: "siteTitle",
            label: "Website title",
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages/",
        format:'mdx',
        ui: {
          filename: {
            slugify: values => {
              return `${values?.title?.toLowerCase().replace(/[^a-zA-Z\d_\-\s]/g, '').replace(/\s/g, '-',)}`
            },
          },
          router: ({ document }) => {
            return "/" + document._sys.filename;
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
            type: "object",
            list: true,
            name: "bands",
            label: "Page Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              // add templates here
              photoBandSchema,
              textBandSchema,
              listBandSchema,
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
            description:"The date this post was updated (if edited after the publish date).",
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
