var request = require('supertest');
var app = require('../../app.js');
var url = 'api/v1/';

testAccount = {
  username: 'admin',
  password: 'admin',
};

describe('GET /posts', function(){
  it('respond with json and with and error', function(done){
    request(app)
      .get('/api/v1/posts')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) { throw err; }
        //res.body.should.have.properties('message');
        //res.body.should.
        expect(res.body.message).not.toBeNull();
        done();
      });


  });
});

describe('Get ADMIN access_token', function() {
    describe('Get a valid access_token in endpoint: /authenticate', function() {});
    it('It should return an ADMIN access_token', function(done) {
        request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(testAccount)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            expect(res.body.message).not.toBeNull();
            expect(res.body.message).toContain("Incorrect username");
            done(err);
        });


    });
});
