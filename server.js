const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Port Number
const port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

//internal use
app.get('/shorten', (req, res) => {
    console.log(req.query);
    const options = {
        method: 'POST',
        url: 'https://api-ssl.bitly.com/v4/shorten',
        headers: { 
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Host': 'api-ssl.bitly.com',
            'Authorization': 'Bearer edc9544b2f6a8dcf0e9f35b5f5391b2db3bfa318'
        },
        body: { long_url: req.query.url },
        json: true
    };
    
      request(options, (error, response, body) => {
        if (error) { throw new Error(error); }
    
        res.send(body);
      });
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
  