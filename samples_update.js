const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "public", "samples");
const outputFile = path.join(__dirname, "public", "samples.json");

const getFiles = (dir) => {
	const fileList = {};

	const items = fs.readdirSync(dir);

	items.forEach((item) => {
		const itemPath = path.join(dir, item);

		if (fs.statSync(itemPath).isDirectory()) {
			const subFiles = getFiles(itemPath);

			Object.keys(subFiles).forEach((key) => {
				fileList[key] = subFiles[key];
			});
		} else {
			const parentDir = path.basename(dir);
			if (!fileList[parentDir]) {
				fileList[parentDir] = [];
			}
			fileList[parentDir].push(item);
		}
	});

	return fileList;
};

const fileStructure = getFiles(baseDir);
fs.writeFileSync(outputFile, JSON.stringify(fileStructure, null, 2));
console.log("File structure updated successfully!");
