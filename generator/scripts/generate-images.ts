#!/usr/bin/env tsx

import imageConfig from '#data/image-config.json';

let currentBottomY = 0;
for (const row of imageConfig.rows) {
	let currentX = 0;
	for (const link of row.links) {
		const { leftX, rightX, href } = link;
		currentX = rightX;
	}
}
