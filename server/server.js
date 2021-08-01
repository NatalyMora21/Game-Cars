const app = require('./app');
const sequelize = require("./database/db");

//settings
const PORT = process.env.PORT || 4001;
//Initialize the server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);

    //Connect to the database
    //Create automation the tables
    //Force: false => Do not restart the tables
    sequelize.sync({force:false}).then(() => {
        console.log("Database connect");
        }).catch((err) => {
        console.log(err);
      });
});