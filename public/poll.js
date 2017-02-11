const socket = io()
const connectionCount = $('#connection-count');
const statusMessage = $('#status-message');
const buttons = document.querySelectorAll('.option-button')
const voteUpdate = $('#vote-update')
const id = window.location.search.split('=')[1]


$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: `/api/poll/${id}`
  }).then(function(response) {
    const poll = response[0]
    renderPoll(poll)
  });
});


function renderPoll(poll) {
		$('.poll-question').text(poll.data.question)

	  $('#button1').text(poll.data.option1)

		$('#button2').text(poll.data.option2)

		$('#button3').text(poll.data.option3)

		$('#button4').text(poll.data.option4)

}

$(document).on('click', '.option-button', function() {
	let id = $(this).attr('id')
	let photo = localStorage.getItem('photo')
	let name = localStorage.getItem('name')

	socket.emit('voteCast', id, photo, name)
})

socket.on('usersConnected', (count) => {
	connectionCount.text('Connected Users: ' + count);
})

socket.on('statusMessage', (message) => {
	statusMessage.text(message)
});



socket.on('voteUpdate', (id, image, votes) => {
	$('.vote-photo').remove()

	votes.map(vote => {
		return $(`.${vote.button_id}_results`).append(`<img
														src=${vote.photo}
														alt="user image"
														class="vote-photo"
													/>`)
	})
})
