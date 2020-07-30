import React from "react";


const CardItem = (props)=>{
    console.log(props)
    const cards = props.cards.map(card=>(
        <div key={card.code}>
            <img src={card.image} alt={card.suit} />
        </div>
    )).reverse()
    return(
        <div className="firstCards">
            {cards}
        </div>
    )
}
const SingleGame = (props) =>{


    let score = props.allValue;
    if(score === 22){
        return(<div>Wygrałeś
            <div>
                <img src={props.addedCardImg} alt={props.addedCard}/>
            </div>
            <p>Aktualny wynik: {props.allValue}</p>
            <div>Poprzednie karty: <CardItem cards={props.firstTwoCards}/></div>
        </div>)
    }
    if(score>22){
        return(<div>Przegrałeś, spróbuj ponownie
            <div>
                <img src={props.addedCardImg} alt={props.addedCard}/>
            </div>
            <p>Aktualny wynik: {props.allValue}</p>
            <div>Poprzednie karty: <CardItem cards={props.firstTwoCards}/></div>
        </div>)
    }

    return(
        <div>Single Game
        <button onClick={props.addButton}>Pobierz kartę</button>
            {props.addedCard !==''? <p>Dobrana karta: {props.addedCard}</p>: null}
            <div>
                <img src={props.addedCardImg} alt={props.addedCard}/>
            </div>
        <p>Aktualny wynik: {props.allValue}</p>
        <div>Poprzednie karty: <CardItem cards={props.firstTwoCards}/></div>
        </div>
    )
}

export default SingleGame;