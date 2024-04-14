const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const respuestaIngresar = require('../mock-server/data/personas/ingresar');
const respuestaRegistro = require('../mock-server/data/personas/usuario');
const respuestaPerfil = require('../mock-server/data/personas/perfildeportivo');
const respuestaPlanes = require('../mock-server/data/administracion/plan');
const respuestaPaises = require('../mock-server/data/administracion/paises');
const respuestaCiudades = require('../mock-server/data/administracion/paises/__param__/ciudades');

server.post('/personas/ingresar', (request, response, next) => {
    response.status(200).send(respuestaIngresar.postIngreso);
});

server.post('/personas/usuario', (request, response, next) => {
    response.status(201).send(respuestaRegistro.postRegistro);
});

server.post('/personas/perfildeportivo', (request, response, next) => {
    response.status(201).send(respuestaPerfil.postPerfil);
});
server.get('/administracion/plan', (request, response, next) => {
    response.status(200).send(respuestaPlanes.obtenerPlanes);
});

server.get('/administracion/paises', (request, response, next) => {
    response.status(200).send(respuestaPaises.obtenerPaises);
});

server.get('/administracion/paises/:codigo/ciudades', (request, response, next) => {
    response.status(200).send(respuestaCiudades.obtenerCiudades);
});

server.listen(8080, () => {
    console.log('JSON server listening on port 8080');
});