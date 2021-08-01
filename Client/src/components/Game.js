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


  const startplay = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    let scoren = 0;
    let playeradv = [];
    let scoreadvplay = [];
    let scoretotal = [];

    while (scoren < 2000) {
      let randomPlayer = Math.floor(Math.random() * cantplayers) + 1;
      let randomAdvance = Math.floor(Math.random() * 6) + 1;


      //Validar si el jugador ya tiene un puntaje
      //Se Crean dos arreglos, 1 para guardar la información de cada movimiento
      //El otro para mostrar el total
      if (playeradv.indexOf(randomPlayer) != -1) {
        scoretotal = scoretotal.map((val) => {
          if (val.id == randomPlayer) {
            scoren = val.score + randomAdvance * 100;
            scoreadvplay = [
              ...scoreadvplay,
              { id: val.id, advance: randomAdvance * 100, scoretotal: scoren },
            ];
            return { id: val.id, score: scoren };
          } else {
            return val;
          }
        });
      } else {
        scoren = randomAdvance * 100;
        scoreadvplay = [
          ...scoreadvplay,
          { id: randomPlayer, advance: scoren, scoretotal: scoren },
        ];
        scoretotal = [...scoretotal, { id: randomPlayer, score: scoren }];
        playeradv.push(randomPlayer);
      }
      setScore(scoren);
    }

    scoretotal.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });

    setScoreplayertotal(scoretotal);
    setScoreplayer(scoreadvplay);

    //Enviar ganador
    const winner = scoretotal[0];
    const upstaewinner = await Axios.post("http://localhost:4001/", winner, {
      headers: headers,
    });
 

    //Actualizar info
    const infogamer = await Axios.get("http://localhost:4001/");
    setPlayers(infogamer.data);

  };



  return (
    <>
      <h1>Gamers</h1>
      <h2>Pista: 2km</h2>
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
      {scoreplayer.length > 0 ?
            <button
            class="w-100 btn btn-warning btn-lg"
            onClick={startplay}
            type="submit"
          >
            Start game
          </button>
          : <p>There is no information in the database</p>
      }


      {scoreplayer.length > 0 ? 
        <>
        <h2>Random Advances</h2> 
        <table class="table">
        <thead>
          <tr>
            <th scope="col"># Car</th>
            <th scope="col">Advance</th>
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
      </>
      
      
      : <></>}



      {score >= 2000 ? (
          
        <>
          <h2>Podium</h2>
          <div class="row">
            {scoreplayertotal[1]?  
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Second place</h3>
                            <h4>No Car: {scoreplayertotal[1].id} </h4>
                            <h5>score: {scoreplayertotal[1].score} m</h5>
                            <h5>score: {scoreplayertotal[1].score/1000} km</h5>
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
                    <h5>score: {scoreplayertotal[0].score} m </h5>
                    <h5>score: {scoreplayertotal[0].score/1000} km </h5>
                </div>
              </div>
            </div>
            {scoreplayertotal[2]? 
                <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">Third place</h3>
                            <h4>No Car: {scoreplayertotal[2].id} </h4>
                            <h5>score: {scoreplayertotal[2].score} m</h5>
                            <h5>score: {scoreplayertotal[0].score/1000} km </h5>
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
