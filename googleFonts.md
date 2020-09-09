## Importing Google Fonts

For custom fonts use Google Fonts.

1. Find the font on: https://fonts.google.com/
2. Customize your font styles to choose they font weight you intend to use.
3. In the top right corner you can preview what you've configured, click "Embed" where you should fine a URL similar to: `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap` 
3. Find latin declaration of the font and copy its URL which may look like `https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzI.woff2`. Add this URL to a component `googleFonts.json` as `preload` key
4. Copy entire `@font-face` declaration into `googleFonts.json` as `fontFace`. Remove unnecessary spaces by replacing (`/\\n\s+/`) with an empty string ""
