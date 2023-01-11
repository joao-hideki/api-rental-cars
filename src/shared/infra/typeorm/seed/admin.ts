import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidv4();
  const password = await hash('admin', 8);
  await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES($1, $2, $3, $4, $5, $6, $7)
  `, [id, 'admin', 'admin@email.com', password, true, 'now()', 'xxx']);
  await connection.close();
}

create().then(() => console.log('User admin created!'));