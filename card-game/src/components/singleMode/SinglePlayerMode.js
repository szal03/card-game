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
            computerActive: true,
            activePassButtonComputer: false,
            gameWinComputer: false,

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
                asTableComputer: actualAsTable
            })
        }
        if(this.state.asTableComputer.length===2){
            console.log("sprawdzam ile jest asów w tabeli asowej")
            this.setState({
                gameWinComputer: true,
            })
        }
    }

    handleTwoRandomCards=()=>{
        let tmpArray=[];
        let cardValueText='';
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
        })}

    handleAddComputerCard=()=>{
            let pointsFromAddingCard=0;
            const deck = this.state.cardDeckSingleGame;
            const actualComputerCards = this.state.computerCards;
            let computerPoints = this.state.computerPoints;
            let randomCardIndex = Math.floor(Math.random()*51);
            let addingCard = deck[randomCardIndex];
            this.checkAsComputer(addingCard);
            pointsFromAddingCard=this.countPoints(addingCard.value);
            actualComputerCards.push(addingCard);
            computerPoints=computerPoints+pointsFromAddingCard;
            this.setState({
                computerCards: actualComputerCards,
                computerPoints: computerPoints,
            })
    }

    handlePassButton=()=>{
        this.handleComputerProcedure();
        console.log("handlePassButton");
        this.setState({
            activePassButton: true,
            //computerActive: true,
        })

    }


    handleCheckScore=()=>{
        const userPoints=this.state.userPoints;
        const computerPoints=this.state.computerPoints;
        const winResult = 21;
        const passUser = this.state.activePassButton;
        const passComputer = this.state.activePassButtonComputer;
        if(passUser===true && passComputer===true){
            if(winResult-userPoints<winResult-computerPoints){
                console.log("wygrał gracz1");
                //set state => userWin
            }else{
                console.log("wygrał komputer");
                //set state => computerWin
            }
        }
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
        let i=0;
        let points = this.state.computerPoints;
        while(this.state.computerActive===true){
            i++;
            if(points<=17){
                this.handleAddComputerCard();
                console.log(points);
                break;
            }
            else if(points<=20){
                let randomNumber = Math.floor(Math.random()*2);
                console.log(randomNumber);
               if(randomNumber===1){
                   this.handleAddComputerCard();
                   break;
               }else{
                   this.handleCheckScore();
                   this.setState({
                       computerActive: false,
                       activePassButtonComputer: true,
                   })
                   break;
               }
                break;
            }
            else if(points === 21){
                this.setState({
                    computerActive: false,
                    activePassButtonComputer: true,
                })
                this.handleCheckScore();
                break;
            }
            else{
                this.setState({
                    computerActive: false,
                    activePassButtonComputer: true,
                })
                break;
            }
        }
        console.log(i);
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
                    userPoints={this.state.userPoints}
                    computerPoints={this.state.computerPoints}
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