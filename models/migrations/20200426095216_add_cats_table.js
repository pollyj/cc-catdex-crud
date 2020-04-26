exports.up = function(knex, Promise) {
  return knex.schema.createTable("cats", t => {
    t.increments().index();

    t.string("name", 15)
      .unique()
      .notNullable()
      .index();

    t.integer("age").notNullable();

    t.string("colour", 15).notNullable();

    t.string("favourite_food", 20);

    t.string("favourite_activity", 50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cats");
};
