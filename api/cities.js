const citiesData = require("./data/cities.json");

module.exports = (req, res) => {
  res.status(200).json(citiesData);
};
