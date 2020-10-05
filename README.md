Single Page Application con ReactJS implementando la funzionalità CRUD (CREATE, READ, UPDATE, DELETE)

- Ho installato JSON-SERVER a livello globale (simulatore di server) per prelevare i dati da un file in formato JSON e salvarli

    npm install -g json-server

- Ho installato il package currently a livello locale che ci consente di avviare in contemporanea sia il server che l'applicazione.

    npm install concurrently --save

- Ho creato una nuova cartella chiamata 'server' all'interno della quale ho creato il mio file json 'db-json' in cui ho inserito alcune serieTV

- All'interno del 'package.json' ho inserito nello script queste righe di codice: 

 "scripts": {
    "start": "concurrently --kill-others \"npm run start-react\" \"npm run json-server\"",
    "start-react": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "json-server": "json-server -p 3001 --watch server/db.json"
  },
  
  (ho quindi modificato 'start' per aggiungere concurrently e inserito 'json-server' che mi si apre alla porta 3001 (http://localhost:3001/series) che richiama il mio file json presente nella cartella server)

- Ho installato axios a livello locale per fare chiamate asincrone (per gestire il GET, PUT, PATCH, DELETE, POST)

    npm install axios --save

- Ho utilizzato gli HOOKS (useEffect (per recuperare i dati dal server), useState)

- Ho creato cartella 'service' all'interno di 'src' per dividere l'applicazione React dalla comunicazione con il server (gestione delle chiamate asincrone) al cui interno ho inserito il file 'serieService.js'

- Ho gestito lo style css tramite la cdn di MATERIALIZE copiata all'interno nell'head di index.html mentre lo script all'interno del body
- Ho inserito inoltre la cdn delle ICONE prese sempre da MATERIALIZE (inserita sotto la chiamata css precedente)