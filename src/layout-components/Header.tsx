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
              destination = link.relativePath.substring(18).replace('.mdx','');

              //Use absolute links if using Cloudflare to host, to address trailing slashes issue

              //dev version
              //destination = "http://localhost:3000/" + destination;

              //Prod version - replace URL with your website's URL
              destination = "https://tina-astro-starter.pages.dev/" + destination;
            }

            if (link.linkType === "external") {
              target = "_blank";
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