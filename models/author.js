const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date_of_birth: DataTypes.DATEONLY,
    date_of_death: DataTypes.DATEONLY,
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.first_name && this.family_name) {
          return `${this.family_name}, ${this.first_name}`;
        } else {
          return "";
        }
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/catalog/author/${this.id}`;
      },
    },
    lifespan: {
      type: DataTypes.VIRTUAL,
      get() {
        let lifetime_string = "";
        if (this.date_of_birth) {
          lifetime_string = moment(this.date_of_birth).format("MMMM Do, YYYY");
        }
        lifetime_string += " - ";
        if (this.date_of_death) {
          lifetime_string += moment(this.date_of_death).format("MMMM Do, YYYY");
        }
        return lifetime_string;
      },
    },
    date_of_birth_yyyy_mm_dd: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date_of_birth).format("YYYY-MM-DD");
      },
    },
    date_of_death_yyyy_mm_dd: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date_of_death).format("YYYY-MM-DD");
      },
    }
  });
  return Author;
};
