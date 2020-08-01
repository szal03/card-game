import React from "react";

const SingleGame=(props)=>{
    const {buttonAdd, buttonPass, buttonBack}=props;
    return(
        <div>Single Game component
        <button onClick={buttonAdd}>Pobierz kartę</button>
        <button onClick={buttonPass}>Pass</button>
        <button onClick={buttonBack}>Powrót</button>
        </div>
    )
}

export default SingleGame;