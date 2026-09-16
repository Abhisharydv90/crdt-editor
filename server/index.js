import { WebSocketServer } from 'ws';
import http from 'http';
import { setupWSConnection } from 'y-websocket/bin/utils';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('CRDT Sync Server is running.');
});

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', setupWSConnection);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(port, host, () => {
  console.log(`🌐 CRDT Sync Server running on ws://${host}:${port}`);
});