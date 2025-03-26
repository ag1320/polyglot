export async function up(knex) {
  await knex.schema.createTable('languages', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('code').notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('languages');
}
