import request from 'supertest';
import { app } from '../../app';

it('clears the session cookie on signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'teuingatuh',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
