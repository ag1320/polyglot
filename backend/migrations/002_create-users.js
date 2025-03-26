export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();

    // Foreign key to languages table
    table.integer('native_language_id').unsigned().references('id').inTable('languages').onDelete('SET NULL');

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Reset token and reset token expiry
    table.string('reset_token');
    table.timestamp('reset_token_expiry');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
