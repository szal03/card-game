import React from "react";
import SingleGame from "./SingleGame";

class SinglePlayerMode extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            points: 0,
            startSingleGame: props.active,
            cardsTable: [],
            userCards:[],
            cardToAdd: [],
            newCard: '',
            newCardImg:'',
            asTable:[]
        }
    }

    componentDidMount() {
        const query ="https://deckofcardsapi.com/api/deck/new/draw/?count=51";
        fetch(query).then(response=>{
            if(response.ok){
                return response
            }
            throw Error(response.status)
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    cardsTable: data.cards,
                })})
            .catch(error=>console.log(error))
    }

    cardsUserUpdate=()=>{
        console.log(this.state.asTable.length);
        let cardToAdd=this.state.cardToAdd;
        let tmpArr = this.state.userCards;
        if(cardToAdd.value !== undefined){
            tmpArr.push(cardToAdd);
            this.setState({
                userCards: tmpArr
            })
        }
        if(this.state.asTable.length===2){
            console.log(this.state.asTable.length);
            console.log("CardsUSERUPDATE 2 ASY")
        }
    }

    countPoints=(cardValueText)=>{
        let cardValue;
        if(cardValueText === "JACK"){ cardValue = 2;}
        else if(cardValueText === "ACE"){ cardValue = 11;}
        else if(cardValueText === "KING"){ cardValue = 4;}
        else if(cardValueText === "QUEEN"){ cardValue = 3;}
        else{
            parseInt(cardValueText)
            cardValue=2;
        }
        return cardValue;
    }

    checkAs=(cardArray)=>{
        const tmpArr = this.state.asTable;
        const checkArray = cardArray.filter(item => item.value === "ACE");
        console.log("checkArray1:"+checkArray);
        console.log(checkArray.length);
        if(checkArray.length>0){
            tmpArr.concat(checkArray)
            console.log("tmpArr checkAss"+ tmpArr);
            this.setState({
                asTable: tmpArr
            })
        }

    }
    checkCard=(card)=>{
        const tmpArr = this.state.asTable;
        if(card.value==="ACE"){
            this.setState(prevState=>({
                asTable: prevState.asTable.push(card)
            }))
        }
    }

    handleStartSingleGame=()=>{
        let arr=[];
        let firstPoints=0;
        for(let i = 0; i<=1; i++){
            let cardValue;
            let points;
            let firstCardsIndex = Math.floor(Math.random()*51);
            let firstCard = this.state.cardsTable[firstCardsIndex];
            cardValue = firstCard.value;
            points=this.countPoints(cardValue);
            firstPoints = firstPoints+points;
            arr.push(firstCard);
        }
        this.checkAs(arr);
        this.setState({
            userCards: arr,
            startSingleGame: true,
            points: firstPoints,

        })

    }

    handleAddCard = () =>{
        let actualCards=this.state.userCards;
        let cardValue;
        let random = Math.floor(Math.random()*51);
        let actualAddingCard = this.state.cardsTable[random];
        this.checkCard(actualAddingCard);
        let cardValueText = actualAddingCard.value;
        cardValue = this.countPoints(cardValueText);
        this.setState(prevstate=> ({
            points: prevstate.points+cardValue,
            newCard: actualAddingCard.value + ' '+actualAddingCard.suit,
            newCardImg: actualAddingCard.image,
            cardToAdd: actualAddingCard
        }))
        this.cardsUserUpdate()

    }

    render(){
        return(
            <div>
                <h1>Single player</h1>
                {this.state.startSingleGame?
                    <div><SingleGame addButton={this.handleAddCard}
                                      firstTwoCards={this.state.userCards}
                                      allValue={this.state.points}
                                      addedCard={this.state.newCard}
                                      addedCardImg={this.state.newCardImg}
                    /></div> : <div><button onClick={this.handleStartSingleGame}>Rozpocznij grę</button>
                    </div>}
                <button onClick={this.props.buttonFunction}>Powrót</button>


            </div>

        )
    }
}

export default SinglePlayerMode;