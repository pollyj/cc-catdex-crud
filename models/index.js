module.exports = function(knex) {
  return {
    cats: require("./cats")(knex)
  };
};
