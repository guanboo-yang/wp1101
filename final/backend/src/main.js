const WebSocket = require('ws');
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });
const ParseData = require('../controller/evtControl');
const { sendData } = require('../connect/wssConnect');

require('dotenv-defaults').config();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
const port = 5000;

db.once('open', () => {
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
            ParseData(byteString, ws, wss);
        };
    });

    server.listen(port, () => {
        console.log(`Listening at port ${port}`);
    });
});
