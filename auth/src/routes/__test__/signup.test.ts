import request from 'supertest';
import { app } from '../../app';

it('returns as 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'teuingatuh',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi',
      password: 'teuingatuh',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'a',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testing@gmail.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'teuingatuh',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'teuingatuh',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'teuingatuh',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'm.habibiazmi@gmail.com',
      password: 'teuingatuh',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
