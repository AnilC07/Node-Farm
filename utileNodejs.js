// CRÉÉE UN SERVER : FACON LA PLUS SIMPLE 

const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Hello from the server") // Envoie tout et n'importe quoi
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8000')
});

// Créée une route (facon from Scratch)
const url = require('url') //Appel le module
const pathname = req.url; // Recuper le path

if (pathname === '/' || pathname === '/overview') { // Affiche un message en fonction du path
    res.end('This is the overview')
} else if (pathname === '/product') {
    res.end('This is the product page')
}else{
    res.writeHead(404,{ // Retourne un statusCode
        "Content-type": "text/html", // Indique le contenu que dois avoir la page
    })
    res.end('Your page doesn\'t exist');
}

// Récuperer un url et ses requêtes
/*
req.url donne tout ce qui se trouve apres le localhost

/product?id=0

Si on le parse avec url.parse(req.url), on obtient :

Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?id=0',
    query: 'id=0',
    pathname: '/product',
    path: '/product?id=0',
    href: '/product?id=0'
  }
  */

  // Export d'un module perso

//   module.exports + fonction anonyme

// Partie théorique : Architecture node

Node depend de V8 engine de javascript et libuv qui est une librairie qui donne acces au systeme d'exploitation, inclut aussi des fonctionnalité comme l'event loop et le thread
Nodejs ecrit en js&c++, libuv en c++ et v8 engine c++&js
Node se base sur d'autre librairie: html-parser, c-ares (DNS etc), Openssl pour la crypto et zlib (compression)

//Quelques recommandations : 
- Ne pas utiliser la version sync des fonction de fs, crypto et zlib module
- ne pas imbriquer de loops
- faire gaffe avec les json tres gros
