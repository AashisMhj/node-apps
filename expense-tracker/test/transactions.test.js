process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server');
let db = require('../src/models');


chai.use(chaiHttp);
describe('Transactions', () =>{
    beforeEach((done) =>{
        // Before each test we empty the database
        db.Transaction.destroy({force: true});
        done()
    });

    // Test the Get route
    describe('/GET transaction', () =>{
        it('it should return a 204 status', (done) =>{
            chai.request(server)
                .get('/api/transactions')
                .end((err, res) =>{
                    console.log(res)
                    res.should.have.status(204);
                    res.body.should.be.a('json');
                    done();
                })
        })
    })
})
