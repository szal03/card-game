import React from "react";
import SingleGameComputer from "./SingleGameComputer";

const SingleGame=(props)=>{
    const {buttonAdd,
        buttonPass,
        buttonBack,
        addButtonStatus,
        buttonReset,
        userPoints,
        computerPoints,
        computerStatus,
        computerStart}=props;

    return(
        <div>Single Game component
        <button onClick={buttonAdd} disabled={addButtonStatus}>Pobierz kartę</button>
        <button onClick={buttonPass}>Pass</button>
        <button onClick={buttonReset}>Reset</button>
        <button onClick={buttonBack}>Powrót</button>
            <p>Wynik gracza: {userPoints}</p>
            <div>
                <SingleGameComputer
                    computerStart={computerStart}
                    computerPoints={computerPoints}/>
            </div>

        </div>
    )
}

export default SingleGame;