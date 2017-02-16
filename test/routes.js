var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp);

describe('GET /', function() {
  it('should return homepage', function(done) {
    chai.request(server)
    .get('/')
    .end(function(error,response) {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });
});

describe('GET /api/poll/:id', function() {
  it('should return the poll', function(done) {
    chai.request(server)
    .get('/api/poll/0')
    .end(function(error,response) {
      response.should.have.status(200);
      response.body.should.be.eql([]);
      done();
    });
  });
});

describe('GET /api/poll', function() {
  it('should return an array of polls', function(done) {
    chai.request(server)
    .get('/api/poll')
    .end(function(error,response) {
      response.should.have.status(200);
      response.body.should.be.eql([]);
      done();
    });
  });
});

describe('GET /poll', function() {
  it('should return an array of polls', function(done) {
    chai.request(server)
    .get('/poll')
    .end(function(error,response) {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });
});

describe('POST api/poll and GET /api/poll/:id' , function() {
  let poll1 = {
    question: 'Who will win the Super Bowl?',
    option1: 'Atlanta Falcons',
    option2: 'New England Patriots',
    option3: 'I dont care',
    option4: 'Left Shark'
  }
  let poll2 = {
    question: 'Whats for lunch?',
    option1: 'salad',
    option2: 'burgers',
    option3: 'pizza',
    option4: 'nothing'
  }
  
  it('should crate a new poll', function(done) {

    chai.request(server)
    .post('/api/poll')
    .send(poll1)
    .send(poll2)
    .end((error, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.poll.should.have.property('id');
      response.body.poll.should.have.property('data');
      done();
    });
  });

  it('should render requested poll2', function(done) {

    chai.request(server)
    .get('/api/poll/d3660efa146f83bf6ec9b8b89c72614a')
    .end(function(error, response) {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body[0].should.have.property('data').eql(poll2)
      done();
    });
  });
});
