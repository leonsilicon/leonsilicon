#!/usr/bin/env tsx

import imageConfig from '#data/image-config.json';
import { getMonorepoDirpath } from 'get-monorepo-root';
import { hash } from 'hasha';
import fs from 'node:fs';
import nullthrows from 'nullthrows-es';
import { outdent } from 'outdent';
import path from 'pathe';
import sharp from 'sharp';
import { generateImagePieces } from '../utils/image.ts';
import { generateReadmeFile } from '../utils/readme.ts';

const monorepoDirpath = nullthrows(getMonorepoDirpath(import.meta.url));

const lightModeImageFilepath = path.join(
	monorepoDirpath,
	'data/figma-exports/README (Light Mode).png',
);
const darkModeImageFilepath = path.join(
	monorepoDirpath,
	'data/figma-exports/README (Dark Mode).png',
);

const image = sharp(lightModeImageFilepath);
const { width: imageWidth, height: imageHeight } = await image.metadata();

if (!imageWidth || !imageHeight) {
	throw new Error('Could not get image dimensions');
}

const [lightModeImagePieces, darkModeImagePieces] = await Promise.all([
	generateImagePieces({ imageFilepath: lightModeImageFilepath }),
	generateImagePieces({ imageFilepath: darkModeImageFilepath }),
]);

await generateReadmeFile({
	lightModeImagePieces,
	darkModeImagePieces,
	imageWidth,
});
