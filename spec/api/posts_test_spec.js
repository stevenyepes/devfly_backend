var frisby = require('frisby');
//var url = 'http://localhost:3000/api/v1/posts';

var url = 'http://devflybldr-devfly.rhcloud.com/api/v1/posts';
frisby.create('Ensure response has proper JSON types in specified keys')
  .get(url)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
    title: String,
    keywords: [String],
    content: String,
    category: String
  })
.toss();

/*frisby.create('Ensure response has proper JSON types in specified keys')
  .addHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Nzc1OWE1YzYzZWFkOTJhMThhNDQ4MGEiLCJlbWFpbCI6InN0ZXZlbkBnbWFpbC5jb20iLCJuYW1lIjoic3RldmVuIiwiZXhwIjoxNDY3OTMzNjA5LCJpYXQiOjE0NjczMjg4MDl9.4_aYljdDXPKfT26vd8ZRe1L2Sig9UinKDsyLwuCUke8')
  .post(url,{
    title: "testing unauthorize user",
    keywords: "remove, spaces, white",
    category: "test",
    content: "hey there from testing"

  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();
*/
