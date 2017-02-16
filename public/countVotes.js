const md5 = require('md5');

const countVotes = (id, photo, name, app) => {
	const vote_id = md5(name);
  const filterArray = testArray || app.locals.votes
	const filterVote = filterArray.filter(vote => vote.name !== name);
	filterArray = filterVote;
	filterArray.push({
		vote_id : vote_id,
		button_id: id,
		photo: photo,
		name: name
	});

	return app.locals.votes;
};

module.exports = countVotes;