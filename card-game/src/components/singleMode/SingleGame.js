import React from "react";
import SingleGameComputer from "./SingleGameComputer";

const SingleGame=(props)=>{
    const {buttonAdd,
        buttonPass,
        buttonBack,
        addButtonStatus,
        buttonPlayAgain,
        userPoints,
        userWin,
        computerPoints,
        computerWin,remis}=props;

    return(
        <div>Single Game component
        <button onClick={buttonAdd} disabled={addButtonStatus}>Pobierz kartę</button>
        <button onClick={buttonPass}  disabled={addButtonStatus}>Pass</button>
        <button onClick={buttonBack}>Powrót</button>
            <p>Wynik gracza: {userPoints}</p>
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
        </div>
    )
}

export default SingleGame;