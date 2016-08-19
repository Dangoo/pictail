const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const execFile = require('child_process').execFile;

const paeckchenConfig = require(
    path.resolve(__dirname, '../paeckchen.json')
);

const ouputPath = path.parse(paeckchenConfig.output.file);

// Creates output filepath recursively
mkdirp(ouputPath.dir, (err, made) => {
    if (made) {
        console.log(`${made} succesfully created!`)
    }
});

fs.copy(
    path.resolve(__dirname, '../src/server'),
    path.resolve(__dirname, '../dist/server'),
    err => {
        if (err) return console.error(err);

        console.log("Moved server");
    }
)

const child = execFile(
    './node_modules/.bin/paeckchen',
    (err, stdout, stderr) => {
        console.log(stdout);
    }
);