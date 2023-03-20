// LANCER UNE COMMANDE AVEC NODE : NODE + NOMDUFICHIER.JS

const fs = require('fs'); // Aceede au module qui permet de lire, écrire dans un ficher du systeme. 'fs' pour "file systeme"
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
// console.log(http)

/* BLOCKING, SYNCHRONOUS WAY */
/*
// fs.readFileSync(*path*, *encoding*)
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)

const textOut = `This is what we know about avocado : ${textIn}.\nCreate on ${Date.now()}`

// fs.writeFileSync(*path where to write*, *variable à ecrire*) CREATE A FILE IF DOESN'T EXIST
fs.writeFileSync('./txt/output.tx', textOut)
*/

/* NON BLOCKING, ASYNCHRONOUS WAY */

/*
// fs.readFile(*path*, *encoding*, callback (err,data)=>{}) 
fs.readFile('./txt/start.txt', 'utf-8', (err,data)=>{
    console.log(data)
})
console.log('File was read successfully')
*/

// fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{

//     if(err) return console.log('🍌')

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=>{
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3)=>{
//             console.log(data3)

//             fs.writeFile('txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('Your file has been written 😁')
//             })
//         })
//     })
// })
// console.log('File was read successfully')

//////////////////////////:
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/index.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/templateProduct.html`,
  'utf-8'
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/templateCards.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
// console.log(tempCards)
// console.log(dataObj)
// dataObj.map(el => console.log(el))

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query);

  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCards, el))
      .join('');
    // console.log(cardHtml)

    const output = tempOverview.replaceAll('{%PRODUCT_CARDS%}', cardHtml);
    // console.log(cardHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end("<h1>Your page doesn't exist</h1>");
  }
});
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to request on port 3000');
});

