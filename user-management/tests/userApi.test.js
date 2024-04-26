const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from a file named server.js

describe('User Management API Endpoints', () => {
  let userId;

  // Test POST /users endpoint
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        username: 'test_user',
        email: 'test@example.com',
        password: 'test123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;
  });

  // Test GET /users endpoint
  it('should retrieve all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test GET /users/:id endpoint
  it('should retrieve a specific user by ID', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', userId);
  });

  // Test PATCH /users/:id endpoint
  it('should update a user by ID', async () => {
    const res = await request(app)
      .patch(`/users/${userId}`)
      .send({ userName: 'updated_userName' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userName', 'updated_userName');
  });

  // Test DELETE /users/:id endpoint
  it('should delete a user by ID', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);

    // Check if user has been deleted
    const deletedUser = await request(app).get(`/users/${userId}`);
    expect(deletedUser.statusCode).toEqual(404);
  });
});
