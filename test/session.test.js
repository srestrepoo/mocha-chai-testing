const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const config = require('../config');


const newSession = { 
    name : 'testing',
    professor: '5c2e3e4e87a2803132ff6eea'
};
describe('CRUD session', () => {
    describe('test auth', () => {
        let query;
        before(async() => {
            try{
                query = await agent.post(`${config.url}/session`)
                    .set('x-access-token',config.professor_token)
                    .type('application/json')
                    .send({session: newSession});
            }catch(error){
                query = error;
            }
        });
        it('unauthorized', () => {
            expect(query.status).to.be.equal(401);
        });
    });
    describe('Create session ', () => {
        let queryCreate;
        before(async() => {
            try{
                queryCreate = await agent.post(`${config.url}/session`)
                        .set('x-access-token',config.admin_token)
                        .type('application/json')
                        .send({session: newSession});
            }catch(error){
                queryCreate = error;
            }
        });
        it('Created', () => {
            expect(queryCreate.body.name).to.be.equal(newSession.name);
            expect(queryCreate.body.professor).to.be.equal(newSession.professor);
            expect(queryCreate.status).to.be.equal(201);
        });
        describe('Update session ', () => {
            let updatedQuery;
            let update = {name: 'testing express api'};
            before(async() => {
                try{
                    updatedQuery = await agent.put(`${config.url}/session/${queryCreate.body._id}`)
                        .set('x-access-token',config.admin_token)
                        .type('application/json')
                        .send({session: update});
                }catch(error){
                    updatedQuery = error;
                }
            });
            it('updated', () => {
                expect(updatedQuery.status).to.be.equal(200);
            });
            describe('Delete session ', () => {
                let deleteQuery;
                before(async() => {
                    try{
                        deleteQuery = await agent.del(`${config.url}/session/${queryCreate.body._id}`)
                            .set('x-access-token',config.admin_token);
                    }catch(error){
                        deleteQuery = error;
                    }
                });
                it('delete', () => {
                    expect(deleteQuery.status).to.be.equal(200);
                });
            });
        });
    });
});