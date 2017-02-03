$(document).ready(function() {
	// $.ajax({
	// 	type: 'GET',
	// 	url: '/poll'
	// }).then(function(response) {
	// 	console.log(response)
	// })

  $.ajax({
    type: 'GET',
    url: '/api/poll'
  }).then(function(response) {
    let poll = response[0]
    renderPoll(poll);
		// redirect(poll)
  });
});

$('.btn-login').on('click', function() {
	renderPoll(poll)
})

function renderPoll(poll) {
	if(!$('.btn-login').is(':visible')) {
		$('.poll-container').hide()
	} else {
	  $('.poll-question').append(
	    `<h3>${poll.data.question}</h3>`
		);
	  $('.poll-options').append(
	    `<button class=option-button type=button>${poll.data.option1}</button>`
	  );
		$('.poll-options').append(
			`<button class=option-button type=button>${poll.data.option2}</button>`
		);
		$('.poll-options').append(
			`<button class=option-button type=button>${poll.data.option3}</button>`
		);
		$('.poll-options').append(
			`<button class=option-button type=button>${poll.data.option4}</button>`
		);
	}
}

function redirect(poll){
	window.history.pushState("", "", `/api/poll/${poll.id}`)
}
