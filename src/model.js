import { DataTypes, Model } from 'sequelize';
import util from 'util';
import url from 'url'
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return `${this.fname} ${this.lname}`
  }
}


Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize: db
  }
)



export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    species: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    birthYear: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize: db
  }
)

Human.hasMany(Animal, {foreignKey: 'humanId'})
Animal.belongsTo(Human, {foreignKey: 'humanId'})

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing database...');
  await db.sync();
  console.log('Finished syncing database!');
}

export default db;
