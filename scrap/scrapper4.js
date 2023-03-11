import got from 'got';
import jsdom from 'jsdom';
import fs from 'fs';


const { JSDOM } = jsdom;

let word = JSON.parse(fs.readFile('../quotes.json'));
let url = "https://citations.ouest-france.fr/top/citations-inspirantes/";
let jsonCollection;


(async () => {

    const array = [];

    let author = '';
    let theme = "inspiration";
    let quote = ''
    
    console.log("scrapping: ", url);

    const response = await got(url);
    const dom = new JSDOM(response.body);

    let quoteList = [...dom.window.document.querySelectorAll('.blcr a')];
    let authorList = [...dom.window.document.querySelectorAll('li a')];


    console.log(quoteList.length);
    console.log(authorList.length);

})();