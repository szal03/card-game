import React from "react";
import SingleGameComputer from "./SingleGameComputer";
import '../style/SingleGame.css'


const PlayerCards=(props)=>{
    let randomNumber = Math.floor(Math.random()*100);
    let secondNrandomNumber = Math.floor(Math.random()*1000);
    const userCards=props.cards.map(card=>(
        <div key={card.code + randomNumber+secondNrandomNumber} className="imgBox">
            <img src={card.image} alt={card.suit}/>
        </div>
    ))
    return userCards;

}

const SingleGame=(props)=>{
    const {buttonAdd,
        buttonPass,
        buttonBack,
        addButtonStatus,
        buttonPlayAgain,
        userPoints,
        userWin,userCards,
        computerPoints,
        computerWin,remis}=props;

    return(
        <div>
            <div className="backButtonBox">
                <button className='modeButtonBack' onClick={buttonBack}><span>Powrót</span></button>
            </div>

            <div>
                <SingleGameComputer
                    computerPoints={computerPoints}/>
            </div>
            {userWin? <div>
                <h1>Wygrał gracz1</h1>
                <button onClick={buttonPlayAgain}>Zagraj ponownie</button>
                </div>: null}
            {computerWin? <div><h1>Wygrał Komputer</h1>
                <button onClick={buttonPlayAgain}>Zagraj ponownie</button>
            </div>: null}
            {remis? <div><h1>Remis</h1> <button onClick={buttonPlayAgain}>Zagraj ponownie</button></div>:null}
            <div className="userContainer">
                <h1>Gracz</h1>
                <div className="userCardContainer">
                    <PlayerCards cards={userCards}/>
                </div>
                <p>Wynik gracza: {userPoints}</p>
                <div className="userButtonsContainer">
                    <button className="gameButtons"
                            onClick={buttonAdd}
                            disabled={addButtonStatus}><span>Pobierz kartę</span></button>
                    <button className="gameButtons"
                            onClick={buttonPass}
                            disabled={addButtonStatus}><span>Pass</span></button>
                </div>

            </div>
        </div>
    )
}

export default SingleGame;