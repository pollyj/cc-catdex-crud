module.exports = (knex, Cat) => {
  return params => {
    const { name } = JSON.parse(params.name);
    return knex("cats")
      .where({ name: name })
      .del()
      .then(() => {
        return knex("cats").select();
      })
      .then(allCats => {
        if (allCats.length) {
          const result = [];
          for (const cat of allCats) {
            result.push(new Cat(cat));
          }
          return result;
        }
        throw new Error("Could not delete cat.");
      });
  };
};
