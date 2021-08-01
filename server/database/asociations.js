//One to many
//User has many transactions
const Player= require('./models/players');
const Scoreplayer= require('./models/scoreplayers');
//Se añade una clave user id a la tabla transactions

Player.hasMany(Scoreplayer);
Scoreplayer.belongsTo(Player);

//User Id to the table transactions