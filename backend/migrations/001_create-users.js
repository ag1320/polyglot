export async function up(knex) {
  await knex.schema.createTable('users', (table) => {

    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();

    // Timestamps
    table.timestamp('created_at')
    table.timestamp('updated_at')

    // Reset token and reset token expiry
    table.string('reset_token');
    table.timestamp('reset_token_expiry');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
