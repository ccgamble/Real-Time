$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/api/poll'
  }).then(function(response) {
    const poll = response[0]
    renderPoll(poll)
		// redirect(poll)
  });
});



function renderPoll(poll) {

	console.log(poll)
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

// socket.on('usersConnected', (count) => {
// 	$('.connection-count').innerText = 'Connected Users: ' + count;
// })
