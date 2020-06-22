const Cat = function(dbCat) {
  this.name = dbCat.name;
  this.age = dbCat.age;
  this.colour = dbCat.colour;
  this.favourite_food = dbCat.favourite_food;
  this.favourite_activity = dbCat.favourite_activity;
};

Cat.prototype.serialize = function() {
  return {
    name: this.name,
    age: this.age,
    colour: this.colour,
    favourite_food: this.favourite_food,
    favourite_activity: this.favourite_activity
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Cat),
    getAllCats: require("./getAllCats")(knex, Cat),
    patch: require("./patch")(knex, Cat),
    delete: require("./delete")(knex, Cat)
  };
};
