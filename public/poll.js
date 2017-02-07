const socket = io()
const connectionCount = $('#connection-count');
const statusMessage = $('#status-message');
const buttons = document.querySelectorAll('.option-button')
const voteUpdate = $('#vote-update')


$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/api/poll'
  }).then(function(response) {
    const poll = response[0]
    renderPoll(poll)
  });
});



function renderPoll(poll) {

	// if(!$('.btn-login').is(':visible')) {
	// 	$('.poll-container').hide()
	// } else {
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
//
// socket.on('voteCount', (votes) => {
//   console.log(votes);
// });


socket.on('voteUpdate', (id, image, votes) => {
	console.log(votes)

	// $('.vote-img').remove()
	votes.map(vote => {
		$('.vote-photo').remove()
		return $(`.${vote.button_id}_results`).append(`<img
														src=${vote.photo}
														alt="user image"
														class="vote-photo"
													/>`)
	})


})

//
// 	socket.on('voteCount', (votes) => {
// 	countVotes(votes)
//   // console.log(votes);
// })

	// function countVotes(votes) {
	//
	// 	voteCount1 = 0
	// 	return Object.values(votes).filter(function(option) {
	// 		// debugger
	// 		if (option === $('.button1').text()) {
	// 			voteCount1 =+ 1
	// 	}
	// 	console.log(voteCount1)
	// 	})
	// }
