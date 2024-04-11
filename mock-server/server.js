const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const respuestaIngresar = require('../mock-server/data/personas/ingresar');
const respuestaRegistro = require('../mock-server/data/personas/usuario');
const respuestaPlanes = require('../mock-server/data/administracion/plan');

server.post('/personas/ingresar', (request, response, next) => {
    response.status(200).send(respuestaIngresar.postIngreso);
});

server.post('/personas/usuario', (request, response, next) => {
    response.status(201).send(respuestaRegistro.postIngreso);
});

server.get('/administracion/plan', (request, response, next) => {
    response.status(200).send(respuestaPlanes.obtenerPlanes);
});

server.listen(8080, () => {
    console.log('JSON server listening on port 8080');
});