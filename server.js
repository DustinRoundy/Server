const net = require('net');
const fs = require('fs');
let counter = 0;
let clientArry = [];
let writeStream = fs.createWriteStream('./chat.log');

let server = net.createServer(client => {
    counter++;
    client.username = 'Guest' + counter;
    clientArry.push(client);
    sendMessage(client, 'joined the chat');
    client.write('Welcome to the server!');
    client.on('data', data => {
        sendMessage(client, data);
    });
    client.on('close', () => {
        clientArry.forEach((reciever, index) => {
            if(reciever === client) {
                clientArry.splice(index, 1);
            }
        });
        clientArry.forEach((reciever, index) => {
            sendMessage(client, 'left the chat');
        });

    });

}).listen(5000);

console.log('Listening on port 5000');


function sendMessage(client, message) {
    writeStream.write(`${client.username}: ${message}` + '\r\n');
    clientArry.forEach(reciever => {
        if (client === reciever){
            return;
        }
        else{
            reciever.write(`${client.username}: ${message}`);
        }
    });
}