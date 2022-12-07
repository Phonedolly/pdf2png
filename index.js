/**
 * index.js
 */
const fs = require("fs");
const path = require("path");
const pdf2img = require('pdf-img-convert');

if (process.argv[2] === undefined) {
    console.log("specify target file");
    return;
}

if (!fs.existsSync(path.join(path.dirname(process.argv[2]), `${path.basename(process.argv[2])}_out`))) {
    fs.mkdirSync(path.join(path.dirname(process.argv[2]), `${path.basename(process.argv[2])}_out`));
}

pdf2img.convert(process.argv[2], { height: 2560 })
    .then((convertedResult) => {
        for (i = 0; i < convertedResult.length; i++) {
            fs.writeFile(path.join(path.dirname(process.argv[2]), `${path.basename(process.argv[2])}_out`, path.basename(process.argv[2] + "." + i + ".png")), convertedResult[i], (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(path.join(path.dirname(process.argv[2]), `${path.basename(process.argv[2])}_out`, path.basename(process.argv[2] + "." + i + ".png")) + " is saved!");
                }
            })
        }
    })
