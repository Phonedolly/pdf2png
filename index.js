const fs = require('fs');
const path = require('path');
const pdf2png = require('pdf2png-mp2');

pdf2png.convert(path.join(__dirname, process.argv[2]), { quality: 300 }, function (resp) {
    if (!resp.success) {
        console.log("Something went wrong: " + resp.error);

        return;
    }

    console.log("Yayy the pdf got converted, now I'm gonna save it!");
    if (!fs.existsSync(path.join(__dirname, `/${process.argv[2]}_out`))) {
        fs.mkdirSync(path.join(__dirname, `/${process.argv[2]}_out`));
    }
    for (i = 1; i < resp.data.length; i++) {
        fs.writeFile(path.join(__dirname, `${process.argv[2]}_out`, process.argv[2] + `.${i}.png`), resp.data[i], function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("file saved!");
            }
        });
    }
});