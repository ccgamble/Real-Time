describe('template', function(){
  var vote, $subject;
  
  beforeEach(function(){
    vote = {vote_id: "1", button_id: "button4", photo: "https://avatars.githubusercontent.com/u/15853081?v=3", name: "Christine Gamble"}
    var subject = imgTemplate(vote)
    var photo = vote.photo
    $subject = $(subject)
  });

  it('generates image', function(){
    $subject.is('image')
  })
  
  it('contains one photo', function(){
  expect($subject.length).to.eql(1);
  })
  
  it('contains image source', function() {
    expect($subject[0].src).to.eql('https://avatars.githubusercontent.com/u/15853081?v=3')
  })
  
  it('has class vote-photo', function() {
    expect($subject[0].className).to.eql('vote-photo')
  })
})