exports.seed = function(knex) {
  return knex("cats")
    .del()
    .then(function() {
      return knex("cats").insert([
        {
          name: "Bobo",
          age: 4,
          colour: "black",
          favourite_food: "miso ramen",
          favourite_activity: "chasing yarn balls"
        },
        {
          name: "Fluffy",
          age: 7,
          colour: "white",
          favourite_food: "milk",
          favourite_activity: "sleeping"
        },
        {
          name: "Asawo",
          age: 6,
          colour: "calico",
          favourite_food: "salmon",
          favourite_activity: "chasing mice"
        },
        {
          name: "Jammy",
          age: 10,
          colour: "orange striped",
          favourite_food: "icecream",
          favourite_activity: "meowing"
        }
      ]);
    });
};

//black, white, orange striped, grey, black and white patches, grey striped, calico
