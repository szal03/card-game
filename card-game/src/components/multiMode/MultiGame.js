import React from "react";

const PlayerCards=(props)=>{
    const userCards=props.cards.map((card,index)=>(
        <div key={index}>
            {card.suit}
        </div>
    ))
    return userCards;

}

const Player=(props)=>{
    const players=props.players.map(player =>(
        <div key={player.userId}>
            <span>{player.name}</span>
            <div>
               <span> {player.userPoints}</span>
                <PlayerCards cards={player.userCards}/>
            </div>
            <div>
                <button disabled={!player.userActiveStatus}
                        onClick={()=>props.addButton(player.userId)}>Pobierz kartę</button>
                <button disabled={!player.userActiveStatus}
                onClick={()=>props.passButton(player.userId)}>Pass</button>
            </div>
        </div>
    ))
    return players;
}


const MultiGame=(props)=>{
    const {usersTable,
        addButton,
        passButton,
        gameEnd,
        gameWiner,
        backButton,
    buttonPlayAgain, persianEye}=props;
    return(
        <div>
            <Player players={usersTable}
                    addButton={addButton}
                    passButton={passButton}/>
            {gameEnd? <div>Wygrał {gameWiner}<button onClick={buttonPlayAgain}>Zagraj ponownie</button></div>:null}
            {persianEye? <div><h1>Perskie oczko!</h1></div>:null}
            <button onClick={backButton}>Powrót</button>
        </div>
    )
}
export default MultiGame;