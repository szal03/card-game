import React from "react";
import '../style/MultiGame.css';

const ShowCardsSummary=(props)=>{
    const playerCards=props.userTable[props.playerId].userCards;
    const playerName=props.userTable[props.playerId].name;
    console.log("handleShowCards");
    const buttonClose = props.buttonClose;
    const showCards=(
        <div className="cardsToShowContainer">
            <div className="cardsToShowButton">
            <button className="closeCardsButton"
                    onClick={()=>buttonClose(props.playerId)}><span>X</span></button>
        </div>
           <div className="cardBox">
               <PlayerCards cards={playerCards}/>
           </div>

        </div>
    )
    return showCards;
}

const PlayerCards=(props)=>{
    const userCards=props.cards.map((card,index)=>(
        <div key={index} className="imgBox">
            <img src={card.image} alt={card.suit}/>
        </div>
    ))
    return userCards;

}

const PlayersTable=(props)=>{
    const players=props.players.map(player =>(
        <div key={player.userId}>
            <span>{player.name}:  <span>{player.userPoints}</span></span>
        </div>
    ))
    return players;
}

const PlayerContent=(props)=>{
    const activePlayer = props.players.filter(status=>status.userActiveStatus);
    let content;
    if(activePlayer!==[]){
        console.log(activePlayer);
        const playerId=activePlayer[0].userId;
        const playerName=activePlayer[0].name;
        const userCards=activePlayer[0].userCards;
        const userPoints=activePlayer[0].userPoints;
        const userStatus=activePlayer[0].userActiveStatus;
        content=(
            <div className="userContainer">
                <h1>{playerName}</h1>
                <div className="userCardContainer">
                    <PlayerCards cards={userCards}/>
                </div>
                <div className="playerScore">
                    <span style={userPoints>21? {color: "red"}:null}>aktualny wynik: {userPoints}</span>
                </div>
                <div className="userButtonsContainer">
                    <button className="gameButtons"
                            disabled={!userStatus}
                            onClick={()=>props.addButton(playerId)}><span>Pobierz kartę</span></button>
                    <button className="gameButtons"
                            disabled={!userStatus}
                            onClick={()=>props.passButton(playerId)}><span>Pass</span></button>
                </div>

            </div>
        )
    }else{
        content=null;
    }

    return content;
}

const SummaryTable=(props)=>{
    const space='        ';
    const userTable=props.players;
    const buttonShowCards = props.buttonShowCards;
    const buttonClose = props.buttonClose;
    const summaryPlayers=props.players.map(player =>(
        <div className="playerSummaryRow" key={player.userId}>
           <div className="titleAndButton">
               <span className="spanInRow">{player.name}:{space}<span>{player.userPoints} pkt</span></span>
               <button className="gameButtonsInRow" onClick={()=>buttonShowCards(player.userId)}><span>Zobacz karty gracza</span></button>
           </div>
            {player.showCards? <div className="containerForShowCards">
                <ShowCardsSummary userTable={userTable}
                                                 playerId={player.userId}
                                                 buttonClose={buttonClose}/>
                </div>:null}

        </div>
    ))
    return summaryPlayers
}
//todo => napraw wyświetlanie kart konkretnego gracza!
const MultiGame=(props)=>{
    const {usersTable,
        addButton,
        passButton,
        gameEnd,
        gameWiner,
        backButton,
    buttonPlayAgain, persianEye,remis, summaryCardShow,buttonShowCards,buttonClose}=props;
    return(
        <div>
            <div className="backButtonBox">
                <button className='modeButtonBack' onClick={backButton}><span>Powrót</span></button>
            </div>
            {!gameEnd? <div className="playersTable">
                <h3>Tabela punktów</h3>
                <PlayersTable players={usersTable}/>
            </div>:null}
            {gameEnd && !remis? <div>
                <div className="infoRow">
                        <h2>Wygrał {gameWiner}</h2>
                    <button className="gameButtons" onClick={buttonPlayAgain}><span>Zagraj ponownie</span></button></div>
                        <h3>Tabela punktów</h3>
                            <div className="summaryTable">
                                <SummaryTable players={usersTable}
                                              summaryCardShow={summaryCardShow}
                                              buttonShowCards={buttonShowCards}
                                              buttonClose={buttonClose}/>
                            </div>


            </div>:null}
            {gameEnd && remis?
                <div>
                    <div className="infoRow"><h2>Remis: {gameWiner}</h2>
                    <button className="gameButtons" onClick={buttonPlayAgain}>Zagraj ponownie</button>
                    </div>
                    <h3>Tabela punktów</h3>
                    <div className="summaryTable">
                        <SummaryTable players={usersTable}
                                      summaryCardShow={summaryCardShow}
                                      buttonShowCards={buttonShowCards}
                                      buttonClose={buttonClose}/>
                    </div>
                </div>:null}
            {persianEye? <div><h1>Perskie oczko!</h1></div>:null}
            {!gameEnd?  <div className="playerContent">
                <PlayerContent players={usersTable}
                               addButton={addButton}
                               passButton={passButton}/>
            </div>:null}
        </div>
    )
}
export default MultiGame;