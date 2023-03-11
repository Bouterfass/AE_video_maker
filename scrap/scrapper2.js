import got from 'got';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import fs from 'fs';

let word = JSON.parse(fs.readFileSync('../quotes.json'));
let url = "https://la-philosophie.com/phrases-philosophiques";
let jsonCollection;

(async () => {

    console.log("scrapping ", url);



    const response = await got(url);
    const dom = new JSDOM(response.body);
    const colList = [...dom.window.document.querySelectorAll(".clearfix ol li")];

    let author = "";
    let theme = "famous";
    let quote = "";

    colList.forEach(el => {

        let tmp = el.innerHTML.replace("<strong>", "").replace("</strong>", "");
        if (tmp.includes("<a")) {
            author = tmp.replace(/<a.*?>|<\/a>/g, "").replace(/<em.*?>|<\/em>/g, "").replace(/<span.*?>|<\/span>/g, "").replace("&nbsp;", " ").replace(" ", "").replace(":", '').split('“')[0];
            quote = tmp.replace(/<a.*?>|<\/a>/g, "").replace(/<em.*?>|<\/em>/g, "").replace(/<span.*?>|<\/span>/g, "").replace("&nbsp;", " ").replace(" ", "").replace(":", '').split('“')[1];
            word.push({ quote: quote, author: author, theme: theme })
        } else {
            author = tmp.replace(/<em.*?>|<\/em>/g, "").replace(/<span.*?>|<\/span>/g, "").replace("&nbsp;", " ").replace(" ", "").replace(":", '').split('“')[0];
            quote = tmp.replace(/<em.*?>|<\/em>/g, "").replace(/<span.*?>|<\/span>/g, "").replace("&nbsp;", " ").replace(" ", "").replace(":", '').split('“')[1];
            word.push({ quote: quote, author: author, theme: theme })
        }
    })
    jsonCollection = JSON.stringify(word);
    fs.writeFile(`quotes.json`, jsonCollection, err => {
        if (err)
            console.log("An error occured");
        else
            console.log("Your file has been created.");
    })
})();
