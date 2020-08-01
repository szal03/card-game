import React from "react";
import SingleGame from "./SingleGame";
import SingleGameComputer from "./SingleGameComputer";

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
            activePassButton: false,

            computerCards:[],
            computerPoints:0,
            asTableComputer:[],
            computerActive: false,

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

    checkAsComputer=(card)=>{
        const actualAsTable = this.state.asTableComputer;
        if(card.value==="ACE"){
            console.log("sprawdzam czy ta karta jest asem")
            actualAsTable.push(card);
            console.log(actualAsTable);
            this.setState({
                asTable: actualAsTable
            })
        }
        if(this.state.asTableComputer.length===2){
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
        /* variables for computer */
        let tmpForComputer=[];
        let cardValueTextForComputer;
        let pointsForComputer;
        let pointsFromCardsForComputer=0;
        for(let i=0; i<=1; i++){
            let firstCardsIndex = Math.floor(Math.random()*51);
            let firstCard = this.state.cardDeckSingleGame[firstCardsIndex];
            cardValueText=firstCard.value;
            console.log(firstCard);
            points=this.countPoints(cardValueText);
            pointsFromCards=pointsFromCards+points;
            this.checkAs(firstCard);
            tmpArray.push(firstCard);
            /* for computer*/
            let firstCardsForComputerIndex = Math.floor(Math.random()*51);
            let firstCardForComputer = this.state.cardDeckSingleGame[firstCardsForComputerIndex];
            cardValueTextForComputer=firstCardForComputer.value;
            console.log(firstCardForComputer);
            pointsForComputer = this.countPoints(cardValueTextForComputer);
            pointsFromCardsForComputer=pointsFromCardsForComputer+pointsForComputer;

            this.checkAsComputer(firstCardForComputer);
            tmpForComputer.push(firstCardForComputer);


        }
        this.setState({
            userCards: tmpArray,
            userPoints: pointsFromCards,
            gameStart: true,

            computerCards:tmpForComputer,
            computerPoints:pointsFromCardsForComputer,
        })
    }

    handleAddCard=()=>{
        console.log("handleAddCard");
        let pointsFromAddingCard=0;
        const deck = this.state.cardDeckSingleGame;
        const actualUserCards = this.state.userCards;
        let userPoints = this.state.userPoints;
        let randomCardIndex = Math.floor(Math.random()*51);
        let addingCard = deck[randomCardIndex];
        this.checkAs(addingCard);
        pointsFromAddingCard=this.countPoints(addingCard.value);
        actualUserCards.push(addingCard);
        userPoints=userPoints+pointsFromAddingCard;
        this.setState({
            userCards: actualUserCards,
            userPoints: userPoints,
        })

    }

    handlePassButton=()=>{
        console.log("handlePassButton");

        this.setState({
            activePassButton: true,
            computerActive: true,
        })

    }

    handleCheckScore=()=>{

    }


    handleBackButtonSinglePlayerMode=()=>{
        this.setState({
            gameStart: false,
            activePassButton: false,
        })
    }

    handleResetButton=()=>{
        this.setState({
            userCards:[],
            userPoints:0,
            asTable:[],
            gameStart: false,
            gameWin: false,
            activePassButton: false,
            computerCards:[],
            computerPoints:0,
            asTableComputer:[],
        })
        this.handleTwoRandomCards();

    }

    handleComputerProcedure=()=>{
        if(this.state.computerActive===true){
            
        }
    }

    render(){
        const {backButton} = this.props;
        return(
            <div>SinglePlayerMode
                {this.state.gameStart? <div><SingleGame
                        buttonAdd={this.handleAddCard}
                    buttonPass={this.handlePassButton}
                    buttonBack={this.handleBackButtonSinglePlayerMode}
                    buttonReset={this.handleResetButton}
                    addButtonStatus={this.state.activePassButton}
                    computerStatus={this.state.computerActive}
                    computerStart={this.handleComputerProcedure}/>
                </div>:
                    <div>
                        <button onClick={this.handleTwoRandomCards}>Rozpocznij grę</button>
                        <button onClick={backButton}>Powrót do menu</button>
                    </div>}

            </div>
        )
    }
}
export default SinglePlayerMode;