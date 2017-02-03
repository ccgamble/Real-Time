const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.locals.title = 'Real Time';

const port = process.env.PORT || 3000;
const server = http.createServer(app)
                 .listen(port, () => {
                    console.log(`Listening on port ${port}.`);
                  });
//
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

app.locals.poll = {}


app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html')
})

app.get('/auth', (request, response) => {
	response.sendFile('/public/authenticate.html')

})

app.get('/api/poll', (request, response) => {
	response.json(app.locals.poll);
});

app.post('/api/poll', (request, response) => {
	const { question, option1, option2, option3, option4 } = request.body
	const poll_id = md5(request.body.question)

	app.locals.poll = {poll_id: poll_id, question: question, option1: option1, option2: option2, option3: option3, option4: option4}

	response.status(202).json({
		poll_id: poll_id,
		question: question,
		option1: option1,
		option2: option2,
		option3: option3,
		option4: option4
	});
});

app.post('/new-poll', (request, response) => {
	const poll_name = request.body.question
	const poll_id = md5(request.body.question)

	response.send(`<a href='/poll/${poll_id}''>Poll: ${poll_name}</a>`)
})



module.exports = server;
