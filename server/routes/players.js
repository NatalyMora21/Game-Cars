const {Router} = require('express');
//Con esto se podrá acceder a todas las propiedades del router
const router = Router();
const {allplayers,updateGamerWon}= require('../controllers/players');

//Consultar todas los juagdores
router.get('/',allplayers);
router.post('/',updateGamerWon);


module.exports = router;