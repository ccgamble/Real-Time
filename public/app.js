$(document).on('click', '.poll-submit-btn', (e) => {
	e.preventDefault()

	const pollObj = {
		question: $('.poll-question-input').val(),
		options: [
			{
				id: 1,
				text: $('.option-input1').val()
			},
			{
				id: 2,
				text: $('.option-input2').val()
			},
			{
				id: 3,
				text: $('.option-input3').val()
			},
			{
				id: 4,
				text: $('option-input4').val()
			}
		]
	};

	$.ajax({
		url:'/new-poll',
		type: 'post',
		data: {
			pollData: pollObj
		}
	})
})
