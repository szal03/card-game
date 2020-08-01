import React from "react";
import SingleGameComputer from "./SingleGameComputer";

const SingleGame=(props)=>{
    const {buttonAdd, buttonPass, buttonBack, addButtonStatus, buttonReset,computerStatus, computerStart}=props;
    return(
        <div>Single Game component
        <button onClick={buttonAdd} disabled={addButtonStatus}>Pobierz kartę</button>
        <button onClick={buttonPass}>Pass</button>
            <button onClick={buttonReset}>Reset</button>
        <button onClick={buttonBack}>Powrót</button>
            <div>
                {computerStatus? <SingleGameComputer computerStart={computerStart}/>:null}
            </div>

        </div>
    )
}

export default SingleGame;