const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const respuestaIngresar = require('../mock-server/data/personas/ingresar');

server.post('/personas/ingresar', (request, response, next) => {
    response.status(200).send(respuestaIngresar.postIngreso);
});

server.listen(8080, () => {
    console.log('JSON server listening on port 8080');
});