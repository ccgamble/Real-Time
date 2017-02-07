$('.poll-submit-btn').on('click', function(e) {

	e.preventDefault()

		const question = $('.poll-question-input').val();
		const option1 = $('.option-input1').val();
		const option2 = $('.option-input2').val();
	 	const option3 = $('.option-input3').val();
		const option4 = $('.option-input4').val();

	$.ajax({
		url:'/api/poll',
		type: 'post',
		dataType: 'json',
		data: {
			question: question,
			option1: option1,
			option2: option2,
			option3: option3,
			option4: option4
		},
		success: postURL
	});
});


postURL = (response) => {
	console.log(response.poll.id)
	 $('body').append(`<a href ='/poll/?poll=${response.poll.id}'>Poll Link</a>`)
}
