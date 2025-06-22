export async function up(knex) {
  // Create the trigger function to update total_points on users table
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_total_points()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE users
      SET total_points = (
        SELECT COALESCE(SUM(language_points), 0)
        FROM users_languages
        WHERE user_id = NEW.user_id
      )
      WHERE id = NEW.user_id;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Create the trigger attached to users_languages table
  await knex.raw(`
    CREATE TRIGGER trigger_update_total_points
    AFTER INSERT OR UPDATE OR DELETE ON users_languages
    FOR EACH ROW
    EXECUTE FUNCTION update_total_points();
  `);
}

export async function down(knex) {
  // Drop the trigger and the function
  await knex.raw(
    `DROP TRIGGER IF EXISTS trigger_update_total_points ON users_languages;`
  );
  await knex.raw(`DROP FUNCTION IF EXISTS update_total_points;`);
}
