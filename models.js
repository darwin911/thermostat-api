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
    unique: true,
    allowNull: false
  },
  password_digest: {
    type: Sequelize.STRING
  }
});

const Thermostat = sequelize.define("thermostats", {
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
    defaultValue: false,
    allowNull: false
  },
  on: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  temperature: {
    type: Sequelize.INTEGER,
    defaultValue: 68,
    allowNull: false
  }
});

User.hasOne(Thermostat, {
  onDelete: "cascade"
});
Thermostat.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  User,
  Thermostat,
  sequelize
};
