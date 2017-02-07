process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp);

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

describe('POST /api/poll', function() {
  it('should create a new poll', function(done) {
    const poll = {
			question: "Who will win the Super Bowl?",
			option1: "Atlanta Falcons",
			option2: "New England Patriots",
			option3: "I don't care",
			option4: "Left Shark"
		}
		chai.request(server)
		.post('/api/poll')
		.end(function(error, response) {
			response.should.have.status(200);
			response.should.be.json;
			response.body.should.be.a('object');
			done();
		});
	});
});
