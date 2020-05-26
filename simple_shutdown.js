const WebSocket = require('ws')
const socket = new WebSocket('ws://www.windows93.net:8081'); // Heres You Put The WebSocket Address

		socket.addEventListener('open', () => {
		socket.send('Hello World!'); // Any Message Here Will Work
		});
 
		socket.addEventListener('message', event => {
			console.log(`Message from server: ${event.data}`);
		});
