const Players = require("../database/models/players");
const Scoreplayers = require("../database/models/scoreplayers");

const allplayers = async (req, res) => {

    const playersinfo = await Players.findAll();
    res.json(playersinfo);

};

const createscore = async (req, res) => {
  //Files: id user,typeoperations and amount
  const { id, score, career } = req.body;

  try {
    let scorePlayer = await Scoreplayers.create({
      idgame:id,
      score,
      career
    });
    res.status(200).json(scorePlayer);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateGamerWon = async (req, res) => {
    const { id} = req.body;
    const gamerresult = await Players.findByPk(id, {
    attributes: ['id', 'gamewon'],
  })

  const updategamer = await Players.update(
    {
      gamewon: parseInt(gamerresult.gamewon
        ) +1,
    },
    {
      where: {
        id: gamerresult.id,
      }
    }
  );
  res.json(updategamer);
};

module.exports = {
    allplayers,
    createscore,
    updateGamerWon
};
