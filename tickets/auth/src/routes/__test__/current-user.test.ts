import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const currentUserResponse = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual(
    'm.habibiazmi@gmail.com'
  );
});

it('responds with null if not authenticated', async () => {
  const currentUserResponse = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser).toEqual(null);
});