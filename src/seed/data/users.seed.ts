import * as bcrypt from 'bcrypt';

interface SeedUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
}

export const USERS_SEED: SeedUser[] = [
  {
    firstName: 'user1',
    lastName: 'perez',
    email: 'prueba@prueba.com',
    password: bcrypt.hashSync('__Pru3b@', 10),
    roles: ['admin', 'user'],
  },
  {
    firstName: 'user2',
    lastName: 'hurtado',
    email: 'prueba2@prueba.com',
    password: bcrypt.hashSync('__Pru3b@', 10),
  },
  {
    firstName: 'user3',
    lastName: 'lopez',
    email: 'prueba3@prueba.com',
    password: bcrypt.hashSync('__Pru3b@', 10),
  },
  {
    firstName: 'user4',
    lastName: 'casas',
    email: 'prueba4@prueba.com',
    password: bcrypt.hashSync('__Pru3b@', 10),
  },
];
