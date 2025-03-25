export async function up(knex) {
  await knex.schema.createTable("test", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("test");
}
