const fs = require('fs');
const path = require("path");
const marked = require('marked');
const { json } = require('../tools');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

const markdown = async (ctx) => {
    try {
        const indexHTML = () => {
            let mdExist = fs.existsSync(path.join(__dirname, '../index.md'));
            let htmlExist = fs.existsSync(path.join(__dirname, '../index.html'));
            if (mdExist) {
                let data = fs.readFileSync(path.join(__dirname, '../index.md'), 'utf8');
                let html = marked(data);
                return html;
            }
            if (htmlExist) {
                let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
                return html;
            }
            throw 'File is not exist!';
        }
        let html = indexHTML();
        ctx.response.body = json(1, 'Get Notice Success!', html);
    } catch (error) {
        ctx.response.body = json(0);
        console.log(error);
    }
}

module.exports = markdown;