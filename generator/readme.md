# @leonsilicon's README Generator

This folder contains the code and assets that are used to generate my profile README.

## Creating your own

To create your own interactive image README, you can clone this repo and update the assets in the [`./data/figma-exports`](./data/figma-exports/) folder, as well as the image configuration located at [`./data/image-config.json`](./data/image-config.json).

If you want to copy the Chrome-style profile but just modify the text and images, you can import the [`./data/figma-exports/README.svg`](./data/figma-exports/README.svg) file into Figma, make your modifications, and re-export them to [`./data/figma-exports/README (Light Mode).png`](./data/figma-exports/README%20(Light%20Mode).png) and [`./data/figma-exports/README (Dark Mode).png`](./data/figma-exports/README%20(Dark%20Mode).png)

## Code and Assets

- [`./data/figma-exports/README.svg`](./data/figma-exports/README.svg): The Figma design file containing both Light Mode and Dark Mode screens exported as an SVG
- [`./data/figma-exports/README (Light Mode).png`](./data/figma-exports/README%20(Light%20Mode).png): The Light Mode screen exported as a PNG
- [`./data/figma-exports/README (Dark Mode).png`](./data/figma-exports/README%20(Dark%20Mode).png): The Dark Mode screen exported as a PNG
- [`./data/image-config.json`](./data/image-config.json): The configuration stored as a JSON file which specifies the sections of the image which open up a link when clicked
- [`./scripts/generate-readme.ts`](./scripts/generate-readme.ts): The entrypoint to code which generates the `readme.markdown` file
