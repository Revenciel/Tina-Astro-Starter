import { useTina } from "tinacms/dist/react";
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
            let destination;
            let target = "";

            if (link.linkType === "internal"){
              destination = link.relativePath;

              let deconstructedLink = link.relativePath.split("/");
              destination = deconstructedLink[deconstructedLink.length - 1].replace(".mdx", "");
            }

            if (link.linkType === "external") {
              target = "_blank";
              // local dev version:
              //destination = link.url;

              //prod version (to address issue with trailing slashes in Cloudflare)
              //replace URL with your website's URL
              destination = "https://tina-astro-starter.pages.dev/" + link.url;
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