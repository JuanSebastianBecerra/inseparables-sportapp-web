const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const loginData = require('../mock-server/data/login');

server.post('/login', (request, response, next) => {
    response.status(200).send(loginData.postLogin);
});

server.listen(8080, () => {
    console.log('JSON server listening on port 8080');
});