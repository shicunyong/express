const fs = require('fs')
const path = require('path')
const paths = './public';
function getFileName(num, paths) {
    const dir = fs.readdirSync(paths)
    dir.forEach((item) => {
        const newUrl = path.join(paths, item)
        let newStats = fs.statSync(newUrl);
        if (newStats.isFile()) {
            num += 1
        } else {
            num = getFileName(num, newUrl)
        }
    })
    return num;
}
let fileNum = getFileName(0, paths);
console.log(fileNum, '------');