require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PRODUCTION, DB_TEST, NODE_ENV } =
	process.env;
// let sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_TEST}`,
//   { logging: false, native: false }
// );
let sequelize =
	NODE_ENV === "production"
		? new Sequelize({
				database: DB_PRODUCTION,
				dialect: "postgres",
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_TEST}`,
				{ logging: false, native: false }
		  );

const basename = path.basename(__filename);
//json w token
//passport
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Account, Transaction, Card, Contact, Charge, Favorite, CashCode } =
	sequelize.models;

// Aca vendrian las relaciones

Account.belongsToMany(Transaction, { through: "transaction_acount" });
Transaction.belongsToMany(Account, { through: "transaction_acount" });

Account.belongsToMany(Charge, { through: "account_charge" });
Charge.belongsToMany(Account, { through: "account_charge" });

Account.belongsToMany(Contact, { through: "account_contact" });
Contact.belongsToMany(Account, { through: "account_contact" });

Account.hasMany(Card);
Card.belongsTo(Account);

Account.hasMany(Favorite);
Favorite.belongsTo(Account);

Account.hasMany(CashCode);
CashCode.belongsTo(Account)

/* Account.belongsToMany(Account, {through: 'user_contact'}) */

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
