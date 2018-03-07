// define your server options, mount path and port, then...
function startServer() {
  return new Promise(function (resolve, reject) {
    const api = new ParseServer(options);
    const app = express();
    app.use(mountPath, api);

    this.httpServer = require('http').createServer(app);
    this.httpServer.listen(port, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

const Parse = require('parse/node');


describe('my test', () => {

      beforeEach(function () {
        return startServer().then(function () {
          Parse.initialize('myAppId');
          Parse.serverURL = 'http://localhost:3000/parse';
        });
      })

      afterEach(function () {
        return Promise.resolve().then(function () {
          return stopServer()
        });
      })

      it('should do stuff', function (done) {
          // bridging between JS promises required by mocha/chai
          Promise.resolve()
            .then(function () {
              return Parse.Cloud.run('doStuff');
            }))
        .then(function (result) {
          expect(result).to.equal('stuff');
          done();
        })
        .catch(done); // will fail the test when CC returns an error


      });