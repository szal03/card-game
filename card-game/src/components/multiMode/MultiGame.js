import React from "react";

const PlayerCards=(props)=>{
    console.log(props.cards);
    const userCards=props.cards.map(card=>(
        <div key={card.code}>
            {card.suit}
        </div>
    ))
    return userCards;

}

const Player=(props)=>{
    console.log(props.players);
    const players=props.players.map(player =>(
        <div key={player.userId}>
            <span>{player.name}</span>
            <div>
               <span> {player.userPoints}</span>
                <PlayerCards cards={player.userCards}/>
            </div>
            <div>
                <button onClick={()=>props.addButton(player.userId)}>Pobierz kartę</button>
                <button>Pass</button>
            </div>
        </div>
    ))
    return players;
}


const MultiGame=(props)=>{
    const {usersTable, addButton}=props;
    return(
        <div>
            multigame
            <Player players={usersTable}
                    addButton={addButton}/>
        </div>
    )
}
export default MultiGame;