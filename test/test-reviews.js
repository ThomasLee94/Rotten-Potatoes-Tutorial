var chai = require("chai");
var chatHttp = require("chai-http");
var app = require("../app");
var should = chai.should();
var Review = require("../cotrollers/review");

chai.use(charHttp);

// tell mocha you want to test Reviews (this string is taco)
describe('Reviews', ()  => {
  // make taco name for the test
  it('should index ALL reviews on / GET', (done) => {
    // use chai-http to make a request to your server
    chai.request(server)
        // send a GET request to root route
        .get('/')
        // wait for response
        .end((err, res) => {
          // check that the response status is = 200 (success)
          res.should.have.status(200);
          // check that the response is a type html
          res.should.be.html;
          // end this test and move onto the next.
          done();
        });
  });

  // TEST NEW
  // TEST CREATE
  // TEST SHOW
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE

});
