export async function up(knex) {
  await knex.schema.createTable('users_languages', (table) => {
    table.increments('id').primary();

    // Foreign key to users
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    // Foreign key to languages
    table.integer('language_id').unsigned().notNullable()
      .references('id').inTable('languages')
      .onDelete('CASCADE');

    // Optional: mark a default or preferred language
    table.boolean('is_default').defaultTo(false);

    // Ensure uniqueness (a user can't learn the same language twice)
    table.unique(['user_id', 'language_id']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users_languages');
}
