module.exports = (knex, Cat) => {
  return async params => {

    await knex("cats").insert({
      name: params.name,
      age: params.age,
      colour: params.colour,
      favourite_food: params.favourite_food,
      favourite_activity: params.favourite_activity
    });

    const result = await knex("cats")
      .where({
        name: params.name
      })
      .select();
    return new Cat(result.pop());
  };
};
