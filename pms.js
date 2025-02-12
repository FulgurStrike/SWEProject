//lack of commenting!
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileSystem = require('fs');


class PMS {
  constructor() {
    this.jsonParser = bodyParser.json;
    this.PORT = 3000;
    this.pms = express();
  }

  startServer() {
    this.pms.set('view engine', 'ejs');
    this.pms.use(express.static(path.join(__dirname, 'public', 'images')));
    this.pms.use(express.static(path.join(__dirname, 'public', 'javascript')));
    this.pms.use(express.static(path.join(__dirname, 'public', 'stylesheets')));

    this.pms.get('/', (req, res) => {
      const indexContent = {
        "title": "Test Title",
        "headerOne": "Test Header"
      }

      res.render('index', indexContent)

    });

    this.pms.listen(this.PORT, () => {
      console.log(`Now listening on port ${this.PORT}`);
      console.log(`http::/localhost:${this.PORT}`);
    });
  }


  
}

let pms = new PMS();
pms.startServer();
