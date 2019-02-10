const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const config = require('../config');

const username = 'srestrepoo'
describe('Get Users test', () => {
    describe('Get one user', () => {
        let query;
        before(async () => {
            query = await agent.get(`${config.url}/user/${username}`);
        });
        it('comprove user', () => {
            expect(query.body.username).to.be.equal(username);
            expect(query.body.name).to.be.equal('Santiago');
            expect(query.body.lastname).to.be.equal('Restrepo');
            expect(query.body.role).to.be.equal('administrator');
            expect(query.status).to.be.equal(200);
        });
    });
    describe('Get all users', () => {
        let query;
        before(async () => {
            query = await agent.get(`${config.url}/user`);
            userRequired = query.body.find(user => user.username === username);
        });
        it('comprove user', () => {
            expect(userRequired.username).to.be.equal(username);
            expect(userRequired.name).to.be.equal('Santiago');
            expect(userRequired.lastname).to.be.equal('Restrepo');
            expect(userRequired.role).to.be.equal('administrator');
            expect(query.status).to.be.equal(200);
        });
    });
});