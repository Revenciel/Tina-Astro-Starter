# Tina + Astro Starter
## Work in progress

### Implemented:
- Visual editing
- Block-based editing
- Responsive header with configurable nav links
- FlexContent block
- Starter MDX component (CTA)
- Click-to-edit
- Search documents in edit mode


### To do:
- Make separate home page collection, distinctive from page collection
- - This will make it possible to prevent the home page from being deleted, as well as omit page title form from the home page
- implement blog
- - Make it possible to all list blog pages in a component

### Notes:
- It is possible to create pages nested under other other pages, and this functionality has been implemented with code in `src/pages/[...slug].astro`, and in `tina/config.ts`. However, Tina does not currently have functionality for content editors to manage folders in src/content. They can create folders by adding `/` to a file name, but then they cannot edit or delete the folders, or move files from one folder to another. For this reason, the "parent page" field for pages has been hidden from the Tina dashboard, and can only be edited by changing the code directly.
- - The header component can accept links to nested pages, but I have not updated the nav to accomodate hovering to see all child pages, as I am deprioritizing this functionality until Tina makes it possible for content editors to manage content folders in the dashboard.

### Thank you:
- Ari Gibson, without whom this project would have been over before it got started
- Tom Bennet, whose Astro + Tina starter was a helpful reference
- The Astro and Tina teams, who created incredible projects

### Credits:
Hamburger icon modelled after: https://codepen.io/alvarotrigo/pen/wvrzPWL