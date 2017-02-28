$('.poll-submit-btn').on('click', function(e) {
  e.preventDefault();
  postPoll();
});

getPollValues = () => {
  const question = $('.poll-question-input').val();
  const option1 = $('.option-input1').val();
  const option2 = $('.option-input2').val();
  const option3 = $('.option-input3').val();
  const option4 = $('.option-input4').val();
  return ({question, option1, option2, option3, option4})
}

postPoll = () => {
  const data = getPollValues()
  $.ajax({
    url:'/api/poll',
    type: 'post',
    dataType: 'json',
    data: {
      question: data.question,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      option4: data.option4
    },
    success: postURL
  });
}

postURL = (response) => {
  $('body').append(`<a href ='/poll/?poll=${response.poll.id}'>Poll Link</a>`);
};

