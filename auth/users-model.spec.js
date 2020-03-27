const request = require('supertest');

const server = require('../api/server.js');

describe('auth-router.js', function() {
    describe('ADD /register', function() {
        it('should return 201 created', function() {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: `user_${Date.now()}`,
                    password: 'password'
                })
                .then(res => {
                    expect(res.body.username).toMatch(/user_/i);
                })
        });

        it('should fail to post if no username is entered', function() {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: '',
                    password: 'password'
                })
                .expect(500);
                
        })

    });

    describe('POST /login', function() {
        it('should return a token for a valid user', function() {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'New Name',
                    password: 'password'
                })
                .then( res => {
                   expect(res.body.token).toBeTruthy();
                })
                
        })

        it('should fail for invalid credentials', function() {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'New Name',
                    password: ''
                })
                .expect(401)
                
        });
    })
    describe('GET /jokes', function() {
        it('should return a list of jokes', function() {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'New Name',
                    password: 'password'
                })
                .then( res => {
                    return request(server)
                .get('/api/jokes')
                .set('Authorization', res.body.token )
                .then( res => {
                    expect(res.status).toBe(200);
                    })
                });
        })

        it('should fail with no authentication', function() {
            
            return request(server)
            .get('/api/jokes')
            .then( res => {
                expect(res.status).toBe(400);
                })
                
        });
    })
})