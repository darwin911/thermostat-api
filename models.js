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
    database: "thermostat",
    dialect: "postgresql",
    operatorAliases: false,
    define: {
      underscored: true
    }
  });
}

const User = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_digest: {
    type: Sequelize.STRING
  }
});

const Thermostat = sequelize.define('thermostats', {
  heating: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  cooling: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  idle: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  temperature: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

