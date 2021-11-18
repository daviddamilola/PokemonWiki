const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites",
    ],
  },
};
