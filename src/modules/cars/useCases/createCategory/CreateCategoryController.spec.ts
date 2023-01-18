import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES($1, $2, $3, $4, $5, $6, $7)
    `, [id, 'admin', 'admin@email.com', password, true, 'now()', 'xxx']);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('shoul be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin'
    });
    const {token} = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: 'Supertest Category',
      description: 'Supertest category'
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(201);
  });
});