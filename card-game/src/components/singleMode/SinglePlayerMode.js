import React from "react";

class SinglePlayerMode extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            cardDeckSingleGame: props.deck,
            userCards:[],
            userPoints:0,
            asTable:[],
            gameStart: false,
            gameWin: false,


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

    checkAs=(card)=>{
        const actualAsTable = this.state.asTable;
        if(card.value==="ACE"){
            console.log("sprawdzam czy ta karta jest asem")
            actualAsTable.push(card);
            console.log(actualAsTable);
            this.setState({
                asTable: actualAsTable
            })
        }
        if(this.state.asTable.length===2){
            console.log("sprawdzam ile jest asów w tabeli asowej")
            this.setState({
                gameWin: true,
            })
        }
    }

    handleTwoRandomCards=()=>{
        let tmpArray=[];
        let cardValueText;
        let points;
        let pointsFromCards=0;
        for(let i=0; i<=1; i++){
            let firstCardsIndex = Math.floor(Math.random()*51);
            let firstCard = this.state.cardDeckSingleGame[firstCardsIndex];
            cardValueText=firstCard.value;
            console.log(firstCard);
            points=this.countPoints(cardValueText);
            pointsFromCards=pointsFromCards+points;
            this.checkAs(firstCard);
            tmpArray.push(firstCard);
        }
        console.log(tmpArray);
        console.log(this.state.asTable);
        this.setState(prevState=>({
            userCards: prevState.userCards.concat(tmpArray),
            userPoints: pointsFromCards
        }))
    }


    render(){
        const {backButton} = this.props;
        return(
            <div>SinglePlayerMode
                {this.state.gameStart? null:
                    <div>
                        <button onClick={this.handleTwoRandomCards}>Rozpocznij grę</button>
                        <button onClick={backButton}>Powrót do menu</button>
                    </div>}

            </div>
        )
    }
}
export default SinglePlayerMode;