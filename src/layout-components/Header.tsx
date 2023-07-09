import { useTina, tinaField } from "tinacms/dist/react";
import siteData from "../content/site-settings/index.json";
import type { TinaProps } from "../types";

export default function Header({ props }: { props: TinaProps }) {
  const { data } = useTina(props);

  return (
    <header>
      <a className="branding" href="/">
        <div className="copy">
          <div className="siteTitle">{siteData.title}</div>
          <div className="tagline">{siteData.tagline}</div>
        </div>
        <img src={siteData.logo} id="logo" alt={`${siteData.title} logo`} />
      </a>
      <input className="checkbox" type="checkbox" name="" id=""/>
      <div id="hamburger">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <nav>
        <menu>
          {siteData.navLinks.map((link) => {

            var destination = link.relativePath.replace("src/content/pages/", "").replace(".mdx", "");;
            var target = "";
            if (link.linkType === "external") {
              target = "_blank";
              // Where is this error coming from?
              destination = link.url;
            }
            // return appropriate link data
            return (
              <li><a href={destination} target={target}>{link.anchor}</a></li>
            )
          })}
        </menu>
      </nav>
    </header>
  );
}

  // var pageName = item?.path
  //                   .substring(0,item?.path.lastIndexOf("."))
  //                   .split("/");
  //                 pageName = pageName[pageName.length - 1];
