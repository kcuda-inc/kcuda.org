# KCUDA Website

This repository contains the static website for Kings County Ultimate Disc Association (KCUDA), an organization dedicated to promoting and developing Ultimate Frisbee in Brooklyn and throughout New York City.

## Site Structure

The website is a simple static site built with HTML and Tailwind CSS:

```
kcuda-website/
├── index.html           # Main HTML file
├── images/              # Image directory
│   ├── about.jpg        # About section image
│   ├── disco.jpg        # Brooklyn Disco Tech team image  
│   ├── hero.jpg         # Hero section background image
│   └── support.jpg      # Brooklyn Tech Support team image
└── README.md            # This file
```

## Making Updates

### Text Content

To update text content, edit the `index.html` file directly. The site is organized into sections:

- Navigation: Top menu items
- Hero: Main headline and intro section
- About: Mission statement and purpose
- Teams: Information about Brooklyn Tech Support and Brooklyn Disco Tech
- Contact: Links to email and social media
- Footer: Copyright information

### Images

To update images, replace the files in the `images/` directory while keeping the same filenames, or update the image paths in the HTML file.

### Styling

The site uses Tailwind CSS via CDN. Most styling is done with Tailwind utility classes directly in the HTML. Custom styles are defined in the `<style>` section in the HTML head.

## Deployment

This site is deployed using Cloudflare Pages.

## Local Development

To work on the site locally:

1. Clone this repository
2. Open `index.html` in your browser to preview changes
3. Make edits to HTML or images as needed
4. Commit and push changes to deploy

## Contact

For questions about KCUDA or this website, contact:
- Email: webmaster AT kcuda.org
- Instagram: [@tech_ult](https://www.instagram.com/tech_ult/)