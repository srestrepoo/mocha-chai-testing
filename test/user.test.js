const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const config = require('../config');

describe('User Test', () => {
    describe('Create User Test', () => {
        let createdUser;
        const newUser = {
            name:"Usuario", 
            lastname:"de Prueba",
            username:"testuser",
            password:"12345",
            role:"professor"
        };
        before(() => {
            const createQuery = agent.post(`${config.url}/user`)
                .type('application/json')
                .send({user: newUser})
                .then((response) => {
                    createdUser = response;
                });
            return createQuery;
        });
        it('create new user', () => {
            expect(createdUser.body.name).to.be.equal("Usuario");
            expect(createdUser.body.lastname).to.be.equal("de Prueba");
            expect(createdUser.body.username).to.be.equal("testuser");
            expect(createdUser.body.password).to.be.equal("12345");
            expect(createdUser.body.role).to.be.equal("professor");
            expect(createdUser.status).to.be.equal(201);
        });
        describe('Delete user', () => {
            let deletedUser;
            before(() => {
                const deleteUser = agent.del(`${config.url}/user/${createdUser.body.username}`)
                    .set('x-access-token',config.admin_token)
                    .then((response) => {
                        deletedUser = response;
                    });
                return deleteUser;
            });
            it('user deleted', () => {
                expect(deletedUser.body.name).to.be.equal("Usuario");
                expect(deletedUser.body.lastname).to.be.equal("de Prueba");
                expect(deletedUser.body.username).to.be.equal("testuser");
                expect(deletedUser.body.password).to.be.equal("12345");
                expect(deletedUser.body.role).to.be.equal("professor");
                expect(deletedUser.status).to.be.equal(200);
            });
        });
    });
});