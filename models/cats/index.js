const moment = require("moment");

const Cat = function(dbCat) {
  this.name = dbCat.name;
  this.age = dbCat.age;
  this.colour = dbCat.colour;
  this.favourite_food = dbCat.favourite_food;
  this.favourite_activity = dbCat.favourite_activity;
};

User.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
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
    list: require("./list")(knex, Cat),
    patch: require("./patch")(knex, Cat),
    delete: require("./delete")(knex, Cat)
  };
};
