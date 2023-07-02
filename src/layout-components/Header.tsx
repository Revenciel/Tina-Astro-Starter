import { useTina, tinaField } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";

export default function Header({ props }: { props: TinaProps }) {
    const { data } = useTina(props);
  
    return (
        <header>
        <a id="branding" href="/">
          <div className="copy">
            <h1>{siteData.title}</h1>
            <p id="tagline">{siteData.tagline}</p>
          </div>
          <img src={siteData.logo} id="logo" alt={`${siteData.title} logo`}/>
        </a>
        <nav>
          <ul>
            {siteData.navLinks.map((link) => {

                var destination = link.relativePath.replace("src/content/pages/","").replace(".mdx","");;
                var target = "";
                if (link.linkType === "external"){
                    target = "_blank";
                    // Where is this error coming from?
                    destination = link.url;
                }
                // return appropriate link data
                return (
                    <li><a href={destination} target={target}>{link.anchor}</a></li>
                  )
            })}
          </ul>
        </nav>
        </header>
    );
  }

  // var pageName = item?.path
  //                   .substring(0,item?.path.lastIndexOf("."))
  //                   .split("/");
  //                 pageName = pageName[pageName.length - 1];
