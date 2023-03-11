import got from 'got';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import fs from 'fs';

let word = JSON.parse(fs.readFileSync('../quotes.json'));
console.log(word);
let url = "https://www.lalanguefrancaise.com/articles/citations-amour-francais";
let jsonCollection;

(async () => {

    console.log("scrapping ", url);

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const colList = [...dom.window.document.querySelectorAll("p")];

    colList.forEach(el => {
        let quote = el.innerHTML
            .replace(".", "|")
            .replace("<strong>", '|')
            .replace("</strong>", '|')
            .replace("<br>", '|')
            .replace("<br>", "|")
            .split("|")[1]
        //console.log(`${quote} \n`);
        let author = el.innerHTML
            .replace(".", "|")
            .replace("<strong>", '|')
            .replace("</strong>", '|')
            .replace("<br>", '|')
            .replace("<br>", "|")
            .split("|")[3]
        if (!author) {
            author = el.innerHTML
                .replace(".", "|")
                .replace("<strong>", '|')
                .replace("</strong>", '|')
                .replace("<br>", '|')
                .replace("<br>", "|")
                .split("|")[4]
        }
        word.push({ quote: quote?.replace("&nbsp;", " "), author: author?.replace("&nbsp;", " "), theme: "amour" });
    })

      jsonCollection = JSON.stringify(word);
  
      fs.writeFile(`quotes.json`, jsonCollection, err =>{
          if (err)
              console.log("An error occured");
          else 
              console.log("Your file has been created.");
      })
})();


/*

Ne pas oublier de retirer toutes les erreurs à la fin du fichier

*/