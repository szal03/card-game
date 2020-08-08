import React from "react";
import '../style/MultiGame.css';

const ShowCardsSummary=(props)=>{
    const playerCards=props.userTable[props.playerId].userCards;
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
            <span>{player.name}:  <span style={player.userPoints>21? {color: "red"}:null}>{player.userPoints}</span></span>
        </div>
    ))
    return players;
}

const PlayerContent=(props)=>{
    const activePlayer = props.players.filter(status=>status.userActiveStatus);
    let content;
    if(activePlayer.length===1){
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
                            onClick={()=>props.passButton(playerId)}><span>Pas</span></button>
                </div>

            </div>
        )
    }
    else{
        const usersTable=props.players;
        const summaryCardShow=props.summaryCardShow;
        const buttonShowCards=props.buttonShowCards;
        const buttonClose=props.buttonClose;
        const gameWiner=props.gameWiner;
        const buttonPlayAgain=props.buttonPlayAgain;
        content=(
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
            </div>
        );
    }

    return content;
}

const Alert=(props)=>{
    const buttonCloseAlert=props.buttonCloseAlert;
    const allPlayers=props.players;
    const activePlayer = props.players.filter(status=>status.userActiveStatus);
    if(activePlayer.length===1){
        let activeUserId=activePlayer[0].userId;
        let lastPlayerName=allPlayers[activeUserId-1].name;
        const alertContent=(
            <div className="alertConstent">
                <span style={{fontSize: '24px'}}>{lastPlayerName} przegrał, teraz nastąpi kolejka {activePlayer[0].name}</span>
                <button className="closeCardsButton"
                        style={{
                            margin:'auto',
                            marginTop:'3%'
                        }}
                        onClick={buttonCloseAlert}><span>OK</span></button>
            </div>
        )
        return alertContent;
    }
    return null;
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

const MultiGame=(props)=>{
    const {usersTable,
        addButton,
        passButton,
        gameEnd,
        gameWiner,
        backButton,
    buttonPlayAgain,
        persianEye,
        remis,
        summaryCardShow,
        buttonShowCards,
        buttonClose,
        showAlert,
        buttonCloseAlert}=props;
    return(
        <div>
            <div className="backButtonBox">
                <button className='modeButtonBack' onClick={backButton}><span>Powrót</span></button>
            </div>
            {!gameEnd? <div className="playersTable">
                <h3>Tabela punktów</h3>
                <PlayersTable players={usersTable}/>
            </div>:null}
            {persianEye? <div><h1>Perskie oczko!</h1></div>:null}
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
            {!gameEnd && !showAlert? <div className="playerContent">
                <PlayerContent players={usersTable}
                               addButton={addButton}
                               passButton={passButton}
                               summaryCardShow={summaryCardShow}
                               buttonShowCards={buttonShowCards}
                               buttonClose={buttonClose}
                               gameWiner={gameWiner}
                               buttonPlayAgain={buttonPlayAgain}/>
            </div>:null}
            {!gameEnd && showAlert? <div className="playerContent">
              <div><Alert players={usersTable} buttonCloseAlert={buttonCloseAlert}/></div>
            </div>:null}
        </div>
    )
}
export default MultiGame;