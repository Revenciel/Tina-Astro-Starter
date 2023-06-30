import { useTina, tinaField } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";
import { Bands } from "../components/bands";

export default function Header({ props }: { props: TinaProps }) {
    const { data } = useTina(props);
  
    return (
        <header>
        <div id="branding">
          <div className="copy">
            <h1>{siteData.title}</h1>
            <p id="tagline">{siteData.tagline}</p>
          </div>
          <img src={siteData.logo} id="logo" alt={`${siteData.title} logo`}/>
        </div>
        <nav>
          <ul>
            {siteData.navLinks.map((link: any) => {

                // determine whether link destination is internal or external
                var destination = link.url;
                var target = "_blank";
                if (link.path != null){
                    target = "";
                    destination = link.path.replace("src/content/pages/","").replace(".mdx","");
                    if (destination === "index"){
                        destination = "/";
                    }
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

