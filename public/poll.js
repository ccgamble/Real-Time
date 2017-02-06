const socket = io()
const connectionCount = $('#connection-count');
const statusMessage = $('#status-message');
const buttons = document.querySelectorAll('.option-button')


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

	// if(!$('.btn-login').is(':visible')) {
	// 	$('.poll-container').hide()
	// } else {
		$('.poll-question').text(poll.data.question)

	  $('.button1').text(poll.data.option1)

		$('.button2').text(poll.data.option2)

		$('.button3').text(poll.data.option3)

		$('.button4').text(poll.data.option4)

}

socket.on('usersConnected', (count) => {
	connectionCount.text('Connected Users: ' + count);
})

socket.on('statusMessage', (message) => {
	statusMessage.text(message)
});



	for (let i = 0; i < buttons.length; i++) {
	  buttons[i].addEventListener('click', function() {
	    console.log(this.innerText);
	  });
	}
