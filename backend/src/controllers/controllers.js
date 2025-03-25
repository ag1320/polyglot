import knex from './dbConnection.js';

const dbOperations = {
  async postTest(first_name, last_name) {
    const data = await knex('players').insert({ first_name, last_name }).returning('*');
    return data;
  },
};

export default dbOperations;
