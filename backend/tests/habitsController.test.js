const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Habits', () => {
    describe('/POST habit', () => {
        it('it should not POST a habit without name field', (done) => {
            let habit = {
                start_datee: "2023-01-01"
            }
            chai.request(server)
                .post('/api/habits')
                .send(habit)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});