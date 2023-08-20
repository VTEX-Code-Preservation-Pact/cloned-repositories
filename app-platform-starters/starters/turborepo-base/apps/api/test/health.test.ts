const request = require("supertest");
const { app } = require("../src/app");

test('GET /health should respond with 200', done => {
    request(app)
        .get('/health')
        .then(res => {
            expect(res.statusCode).toEqual(200);
            done();
        });
});
