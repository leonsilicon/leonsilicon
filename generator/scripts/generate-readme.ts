#!/usr/bin/env tsx

import ora from 'ora';
import path from 'pathe';
import sharp from 'sharp';
import { generateImagePieces } from '../utils/image.ts';
import { monorepoDirpath } from '../utils/paths.ts';
import {
	convertReadmeMdToImage,
	generateReadmeMarkdownFile,
} from '../utils/readme.ts';

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

const spinner = ora('Generating README images...').start();

const [
	lightModeImagePieces,
	darkModeImagePieces,
	lightModeReadmeMdImageFilepath,
	darkModeReadmeMdImageFilepath,
] = await Promise
	.all([
		generateImagePieces({ imageFilepath: lightModeImageFilepath }),
		generateImagePieces({ imageFilepath: darkModeImageFilepath }),
		convertReadmeMdToImage({ imageWidth, imageHeight, theme: 'light' }),
		convertReadmeMdToImage({ imageWidth, imageHeight, theme: 'dark' }),
	]);

spinner.text = 'Generating README...';

await generateReadmeMarkdownFile({
	lightModeImagePieces,
	darkModeImagePieces,
	imageWidth,
	lightModeReadmeMdImageFilepath,
	darkModeReadmeMdImageFilepath,
});

spinner.succeed('README generated!');
