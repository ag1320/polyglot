export async function up(knex) {
  await knex.schema.createTable('users_languages', (table) => {
    table.increments('id').primary();

    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    table.integer('language_id').unsigned().notNullable()
      .references('id').inTable('languages')
      .onDelete('CASCADE');

    table.boolean('is_default').defaultTo(false);
    table.string("voice").defaultTo(null);

    table.integer('language_points').unsigned().defaultTo(0);

    table.unique(['user_id', 'language_id']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users_languages');
}
