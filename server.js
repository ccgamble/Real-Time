const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Time';

app.locals.poll = {
	poll_id: 1,
	question: "Who will win the Super Bowl?",
	choices: [
		{choice_id: 1,
		option: "New England Patriots"},
		{choice_id: 2,
		option: "Atlanta Falcons"},
		{choice_id: 3,
		option: "I don't care as long as the Patriots lose!"},
		{choice_id: 4,
		option: "What?"}
	],
	votes: [
		{user: "Alex",
		choice_id: 1},
		{user: "Meeka",
		choice_id: 2}
	]
}

app.locals.users = [
	{user: "Alex",
	user_id: 1,
	photo: "alex.photo.com",
	email: "alex@turing.com",
	github_username: "alex.tideman"},
	{user: "Meeka",
	user_id: 2,
	photo: "meeka.photo.com",
	email: "meeka@turing.com",
	github_username: "meeka.gayhart"}
]

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html')
})

app.get('/auth', (request, response) => {
	response.sendFile('/public/authenticate.html')
	console.log('authenticating...')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}.`);
});
