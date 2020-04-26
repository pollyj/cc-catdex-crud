module.exports = (knex, Cat) => {
  return async params => {
    // const username = params.username;

    // if (!validateUsername(username)) {
    //   return Promise.reject(
    //     new Error("Username must be provided, and be at least two characters")
    //   );
    // }

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

    // return knex("users")
    //   .insert({ username: username.toLowerCase() })
    //   .then(() => {
    //     return knex("users")
    //       .where({ username: username.toLowerCase() })
    //       .select();
    //   })
    //   .then((users) => new User(users.pop())) // create a user model out of the plain database response
    //   .catch((err) => {
    //     // sanitize known errors
    //     if (
    //       err.message.match("duplicate key value") ||
    //       err.message.match("UNIQUE constraint failed")
    //     )
    //       return Promise.reject(new Error("That username already exists"));

    //     // throw unknown errors
    //     return Promise.reject(err);
    //   });
  };
};
