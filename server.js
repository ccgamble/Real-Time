const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5')
const _ = require('lodash');

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
//
const votes = {};
const socketIo = require('socket.io');
const io = socketIo(server);



app.locals.polls = []
app.locals.votes = []


app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html')
})


app.get('/poll', (request, response) => {
  response.sendFile(__dirname + '/public/poll.html')
})

app.get('/poll/*', (request, response) => {
  response.sendFile(__dirname + '/public/poll.html')
});


app.get('/api/poll', (request, response) => {
	response.json(app.locals.polls);
});

app.post('/api/poll', (request, response) => {
	response.setHeader("Content-Type", "application/json");
	const data = request.body
	const id = md5(data)
	const poll = {id, data}


	app.locals.polls.push(poll)
	response.status(200).json({poll})
});

app.get('/api/poll/:id', (request, response) => {
	var data = app.locals.polls.filter((poll) => {
    return poll.id === request.params.id
  })
  response.json(data)
})

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);
	io.sockets.emit('usersConnected', io.engine.clientsCount);

	socket.emit('statusMessage', 'You have connected.');

	socket.on('voteCast', (id, photo, name) => {
		countVotes(id, photo, name)
		socket.emit('statusMessage', 'Thanks for voting!')
		io.sockets.emit('voteUpdate', id, photo, app.locals.votes)

	});

	socket.on('disconnect', () => {
	  console.log('A user has disconnected.', io.engine.clientsCount);
	  delete votes[socket.id];
	  socket.emit('voteCount', votes)
	  io.sockets.emit('usersConnected', io.engine.clientsCount);
	});
});

const countVotes = (id, photo, name) => {
	const vote_id = app.locals.votes.length + 1
	const filterVote = app.locals.votes.filter(vote => vote.name !== name)
		app.locals.votes = filterVote
		app.locals.votes.push({
			vote_id : vote_id,
			button_id: id,
			photo: photo,
			name: name
		})
		return app.locals.votes
	}




module.exports = server;
