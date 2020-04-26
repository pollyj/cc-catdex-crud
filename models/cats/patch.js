module.exports = (knex, Cat) => {
  return async params => {
    const { name, age, colour, favourite_food, favourite_activity } = params;
    await knex("cats")
      .where({ name })
      .update({ age, colour, favourite_food, favourite_activity })
      .then(() => {
        return knex("cats")
          .select()
          .where({ name });
      });

    const result = await knex("cats")
      .where({ name })
      .select();
    return new Cat(result.pop());
  };
};
