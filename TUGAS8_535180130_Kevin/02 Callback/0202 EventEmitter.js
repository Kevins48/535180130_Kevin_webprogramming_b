var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
    console.log('connection succesful.');
    eventEmitter.emit('data_received');
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function() {
    console.log('data received succesful.');
});

eventEmitter.emit('connection');

console.log("Program Ended.");