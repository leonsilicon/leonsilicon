import type { ImagePiece } from '#types';
import { getMonorepoDirpath } from 'get-monorepo-root';
import zip from 'just-zip-it';
import fs from 'node:fs';
import nullthrows from 'nullthrows-es';
import { outdent } from 'outdent';
import path from 'pathe';

export async function generateReadmeFile({
	imageWidth,
	darkModeImagePieces,
	lightModeImagePieces,
}: {
	imageWidth: number;
	darkModeImagePieces: ImagePiece[];
	lightModeImagePieces: ImagePiece[];
}) {
	const monorepoDirpath = nullthrows(getMonorepoDirpath(import.meta.url));

	// We use GitHub pages to host our static images since it seems like that's more
	// reliable compared to using `raw.githubusercontent.com` URLs.
	const getCropImgSrc = (filepath: string) =>
		`https://leonsilicon.github.io/leonsilicon/generator/generated/${
			path.basename(filepath)
		}`;
	const getImgWidth = (width: number) => `${(width / imageWidth) * 100}%`;
	const getImgHeight = (height: number) => height;

	const readmeFooter = outdent({ trimLeadingNewline: false })`
		###### 👆 The above image is interactive! Try clicking on the tabs :)
	`;

	const readme = zip(lightModeImagePieces, darkModeImagePieces).map(
		([lightModeImagePiece, darkModeImagePiece]) => {
			const { href } = lightModeImagePiece;
			const imgHeight = getImgHeight(lightModeImagePiece.height);
			const imgWidth = getImgWidth(lightModeImagePiece.width);

			const lightModeImgSrc = getCropImgSrc(lightModeImagePiece.filepath);
			const darkModeImgSrc = getCropImgSrc(darkModeImagePiece.filepath);

			const pictureHtml = outdent`
				<picture><source media="(prefers-color-scheme: light)" srcset="${lightModeImgSrc}"><source media="(prefers-color-scheme: dark)" srcset="${darkModeImgSrc}"><img src="${lightModeImgSrc}" height="${imgHeight}" width="${imgWidth}" /></picture>
			`;

			const markdown = href === null ?
				pictureHtml :
				`<a href="${href}">${pictureHtml}</a>`;

			return markdown;
		},
	).join('') + readmeFooter;

	await fs.promises.writeFile(
		path.join(monorepoDirpath, '../readme.markdown'),
		readme,
	);
}
