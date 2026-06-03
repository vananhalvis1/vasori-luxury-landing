const fs = require('fs');
const path = require('path');
const srcDir = 'C:\\Users\\GOODM!\\.gemini\\antigravity-ide\\brain\\a7d0a6cb-32b3-4633-b902-48ebb3d5ac79';
const destDir = 'd:\\DN X tech';
const files = fs.readdirSync(srcDir);
files.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
        let newName = file;
        if(file.startsWith('cherry_red_banner')) newName = 'banner-cherry.png';
        if(file.startsWith('japanese_fruits')) newName = 'banner-japan.png';
        if(file.startsWith('corporate_gift')) newName = 'banner-corporate.png';
        if(file.startsWith('global_fruits')) newName = 'banner-global.png';
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
        console.log(`Copied ${file} to ${newName}`);
    }
});
