const express = require('express')
const app = express()
fs = require('fs');

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

api = fs.readFileSync(__dirname + '/latest-api.js');

//routes
 app.get('/', (req, res) => {
	res.render('index')
})
app.get('/api.js', (req, res) => {
	res.writeHead(200, {
		'Content-type': 'text/javascript'
	});
	res.end(api)
})


//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('user joined', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('message', (data) => {
        //broadcast the new message
		io.sockets.emit('message', {message : data.message, username : socket.username});
		console.log(data)

		if (data.split(' ')[0] == 'shutdown') {
			console.log('Shutdowing Server...')
		const WebSocket = require('ws')
		const socket = new WebSocket(data.split(' ')[1]);

		socket.addEventListener('open', () => {
		socket.send('Hello World!');
		});
 
		socket.addEventListener('message', event => {
			console.log(`Message from server: ${event.data}`);
		});
		}
    })

    //listen on typing
    /* socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })*/
	socket.on('shuttb', (data) => {
		console.log('Shutdowing Server...')
		const WebSocket = require('ws')
		const socket = new WebSocket('ws://www.windows93.net:8081');

		socket.addEventListener('open', () => {
		socket.send('Hello World!');
		});
 
		socket.addEventListener('message', event => {
			console.log(`Message from server: ${event.data}`);
		});
	})
})
