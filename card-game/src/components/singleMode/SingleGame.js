import React from "react";

const SingleGame=(props)=>{
    const {buttonAdd, buttonPass, buttonBack, addButtonStatus, buttonReset}=props;
    return(
        <div>Single Game component
        <button onClick={buttonAdd} disabled={addButtonStatus}>Pobierz kartę</button>
        <button onClick={buttonPass}>Pass</button>
            <button onClick={buttonReset}>Reset</button>
        <button onClick={buttonBack}>Powrót</button>
        </div>
    )
}

export default SingleGame;