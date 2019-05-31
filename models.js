const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgresql",
    operatorAliases: false,
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
    database: "tracker",
    dialect: "postgresql",
    operatorAliases: false,
    define: {
      underscored: true
    }
  });
}
