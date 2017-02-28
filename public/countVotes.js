const md5 = require('md5');

const countVotes = (id, photo, name, app) => {
	const vote_id = md5(name);
	const filterVote = app.locals.votes.filter(vote => vote.name !== name);
	app.locals.votes = filterVote;
	app.locals.votes.push({
		vote_id : vote_id,
		button_id: id,
		photo: photo,
		name: name
	});

	return app.locals.votes;
};

module.exports = countVotes;