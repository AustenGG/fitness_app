var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./app');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 non exixtent pages', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('all pages found', function testPath(done) {
    request(server)
      .get('/home')
      .expect(302, done);
  });
});
