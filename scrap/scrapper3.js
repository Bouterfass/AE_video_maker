import got from 'got';
import jsdom from 'jsdom';
import fs from 'fs';

const { JSDOM } = jsdom;

let word = JSON.parse(fs.readFileSync('../quotes.json'));
let url = "https://www.abc-citations.com/themes/courage/";
let jsonCollection;

(async () => {

  const array = []

  let author = '';
  let theme = 'courage';
  let quote = '';

  for (let page = 1; page <= 5; page++){

  if (page >= 2) url = `https://www.abc-citations.com/themes/courage/page/${page}/` 


  console.log("scrapping: ", url);

  const response = await got(url);
  const dom = new JSDOM(response.body);
  let quoteList = [...dom.window.document.querySelectorAll('.small .content')];
  quoteList = [...quoteList, ...dom.window.document.querySelectorAll('.medium .content')];
  quoteList = [...quoteList, ...dom.window.document.querySelectorAll('.large .content')];
  let authorList = [...dom.window.document.querySelectorAll('.small .author a')];
  authorList = [...authorList, ...dom.window.document.querySelectorAll('.medium .author a')];
  authorList = [...authorList, ...dom.window.document.querySelectorAll('.large .author a')];

  for (let i = 0; i < quoteList.length; i++) {

    quote = quoteList[i].querySelector('div').innerHTML.trim();
    author = authorList[i].innerHTML.trim();

    array.push({ "quote": quote, "author": author, "theme": theme })
  }
}

  console.log(array.length);
  word = [...word, ...array];
  console.log(word);
  console.log('length: ', word.length);
  
  jsonCollection = JSON.stringify(word);
  fs.writeFile(`quotes.json`, jsonCollection, err => {
      if (err)
          console.log("An error occured");
      else
          console.log("Your file has been created.");
  })

})();


