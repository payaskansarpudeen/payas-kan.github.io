# Payaskan Sarpudeen — Professional Portfolio

This is a responsive static website built with HTML, CSS and JavaScript for GitHub Pages.

## Included
- Professional profile and career timeline
- Achievement dashboard with charts
- Five supplied certificate images with full-size modal viewing
- Selected quality-improvement projects
- Technical expertise categories
- Education and contact sections
- CV PDF link

## Preview locally
Open `index.html` in a modern browser. For the most reliable local preview, run a static server from this folder:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Publish on GitHub Pages
1. Create a new GitHub repository (for example, `payaskan-portfolio`).
2. Upload all files and folders from this package, keeping the directory structure.
3. In repository Settings → Pages, choose deployment from the `main` branch and `/ (root)`.
4. Save and wait for GitHub Pages to publish the site.
5. Test the public website on desktop and mobile.

## Before publishing
- Confirm all CV dates, job titles and company names.
- Confirm that the listed contact details should be public. The page currently displays the supplied email, LinkedIn profile and Saudi phone number; a second international phone number was not added.
- Check the accuracy and publication permissions for all certificates and project details.
- The defect-rate chart uses 14.3% as the starting point and 1.3% as the reported current rate, as supplied. It shows a 13.0 percentage-point decrease and a 90.9% relative reduction.
- Training counts are displayed as separate categories and may overlap; they are not added into a unique-person total.
- The site uses Google Fonts from fonts.googleapis.com. If you prefer a fully offline site, remove the font imports from `index.html`.
- No unsupported ISO certification or qualification claims have been added. IEC 60480 is described as knowledge/reference in the supplied career notes, not as a certification.

## Edit content
Edit `index.html` for text, dates, links and certificate metadata.
Edit `styles.css` for visual styling.
Edit `script.js` for chart labels and values.
Certificate images are in `assets/certificates/`; CV is in `assets/documents/`.
