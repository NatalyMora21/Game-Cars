import { useEffect, useState } from "react";
import Players from "./Players";
import Axios from "axios";

const Play = () => {
  const [players, setPlayers] = useState([]);
  const [cantplayers, setCantplayers] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreplayer, setScoreplayer] = useState([]);
  const [scoreplayertotal, setScoreplayertotal] = useState([]);
  const [start, setStart] = useState(false);

  useEffect(async () => {
    //consultar en la base de datos los jugadores y sus juegos ganados

    //Traer info de la base de datos
    const infogamer = await Axios.get("http://localhost:4001/");
    setPlayers(infogamer.data);
    setCantplayers(infogamer.data.length);
  }, []);



  return (
    <>
      <h1>Gamers</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"># Car</th>
            <th scope="col">Name</th>
            <th scope="col">Games won</th>
          </tr>
        </thead>
        <tbody>
          {players.map((play) => (
            <Players id={play.id} name={play.name} won={play.gamewon}></Players>
          ))}
        </tbody>
      </table>

      <button
        class="w-100 btn btn-warning btn-lg"
        onClick={startplay}
        type="submit"
      >
        Start game
      </button>

      {scoreplayer.length > 0 ? <h2>Random Advances</h2> : <></>}

      <table class="table">
        <thead>
          <tr>
            <th scope="col"># Car</th>
            <th scope="col">Adavance</th>
            <th scope="col">Parcial Total</th>
          </tr>
        </thead>
        <tbody>
          {scoreplayer.map((score) => {
            return (
              <>
                <tr>
                  <th scope="row">{score.id}</th>
                  <td>{score.advance}</td>
                  <td>{score.scoretotal}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      {score >= 1 ? (
          
        <>
          <h2>Podium</h2>
          <div class="row">
            {scoreplayertotal[1]?  
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Second place</h3>
                            <h4>No Car: {scoreplayertotal[1].id} </h4>
                            <h5>score: {scoreplayertotal[1].score}</h5>
                        </div>
                    </div>
                </div>
                :<></>
            }
            <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                    <h3 class="card-title">First place</h3>
                    <h4>No Car: {scoreplayertotal[0].id} </h4>
                    <h5>score: {scoreplayertotal[0].score}</h5>
                </div>
              </div>
            </div>
            {scoreplayertotal[2]? 
                <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">Third place</h3>
                            <h4>No Car: {scoreplayertotal[2].id} </h4>
                            <h5>score: {scoreplayertotal[2].score}</h5>
                    </div>
                </div>
                </div>
                :<></>
            }
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Play;
