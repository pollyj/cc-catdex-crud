module.exports = (knex, Cat) => {
  return () => {
    return knex("cats")
      .select()
      .then(allCats => {
        if (allCats.length) {
          const result = [];
          for (const cat of allCats) {
            result.push(new Cat(cat));
          }
          return result;
        }
        throw new Error("Could not get cats.");
      });
  };
};
