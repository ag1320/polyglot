export async function up(knex) {
  await knex.schema.createTable('words', (table) => {
    table.increments('id').primary();

    // Foreign keys
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');

    table.integer('language_source_id').unsigned().notNullable()
      .references('id').inTable('languages').onDelete('CASCADE');

    table.integer('language_target_id').unsigned().notNullable()
      .references('id').inTable('languages').onDelete('CASCADE');

    // Core word fields
    table.string('word_in_source_language').notNullable();
    table.string('word_in_target_language').notNullable();

    // Performance tracking
    table.integer('score').defaultTo(0);
    table.integer('correct_attempts').defaultTo(0);
    table.integer('incorrect_attempts').defaultTo(0);
    table.integer('total_attempts').defaultTo(0);
    table.integer('current_correct_streak').defaultTo(0);
    table.integer('current_incorrect_streak').defaultTo(0);
    table.timestamp('last_tested_at');
    //REMOVE table.integer('exposure_count').defaultTo(0);
    table.string('mastery_level').defaultTo('weak'); // weak, learning, strong, etc.
    table.decimal('recall_accuracy', 5, 2).defaultTo(0.0); // e.g. 87.50

    // Optional fields
    table.text('example_sentence');
    table.text('notes');
    table.boolean('is_favorite').defaultTo(false);
    table.boolean('ignore_word').defaultTo(false);

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('words');
}
