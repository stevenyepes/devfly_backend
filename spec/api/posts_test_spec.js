var request = require('supertest');
var app = require('../../app.js');
var db = require('../utils/db.js');


describe('GET /posts on bd with data', function(){
  beforeAll(function(done) {
    db.setupDatabase(done);
  });

  afterAll(function(done){
    db.reset(done);
  });

  it('respond with posts', function(done){
    request(app)
      .get('/api/v1/posts/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) { throw err; }
        console.log(res.body[0]);
        expect(res.body[0]).not.toBeUndefined();
        expect(res.body[0].title).not.toBeUndefined();
        expect(res.body[0].category).not.toBeUndefined();
        expect(res.body[0].author).not.toBeUndefined();
        expect(res.body[0].date).not.toBeUndefined();
        expect(res.body[0].views).not.toBeUndefined();
        done();
      });
  });

});

describe('GET /posts on bd without data', function(){

  it('respond with posts', function(done){
    request(app)
      .get('/api/v1/posts/')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) { throw err; }
        console.log(res.body);
        expect(res.body.message).toBe("There is no post yet");
        done();
      });
  });

});

/*describe('Get ADMIN access_token', function() {
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
*/
