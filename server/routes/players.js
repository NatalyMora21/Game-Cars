const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {allplayers,updateGamerWon}= require('../controllers/players');

//Consultar todas los juagdores
router.get('/',allplayers);
router.post('/',updateGamerWon);


//Crear puntaje de cada jugador
//router.post('/',createadvances);

//crear una partida
//router.post('/newpartida',newpartida);



module.exports = router;