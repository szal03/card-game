import React from "react";
import SingleGame from "./SingleGame";
import '../style/ModeButton.css'

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
            winPointsUser: false,
            activePassButton: false,
            activePassButtonStatus:false,

            computerCards:[],
            computerPoints:0,
            asTableComputer:[],
            computerActive: true,
            winPointsComputer: false,
            activePassButtonComputer: false,
            gameWinComputer: false,
            remis: false,
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
            actualAsTable.push(card);
            this.setState({
                asTable: actualAsTable
            })
        }
        if(this.state.asTable.length===2){
            this.setState({
                gameWin: true,
                activePassButton: true
            })
        }
    }

    checkAsComputer=(card)=>{
        const actualAsTable = this.state.asTableComputer;
        if(card.value==="ACE"){
            actualAsTable.push(card);
            this.setState({
                asTableComputer: actualAsTable
            })
        }
        if(this.state.asTableComputer.length===2){
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
            points=this.countPoints(cardValueText);
            pointsFromCards=pointsFromCards+points;
            this.checkAs(firstCard);
            tmpArray.push(firstCard);
            /* for computer*/
            let firstCardsForComputerIndex = Math.floor(Math.random()*51);
            let firstCardForComputer = this.state.cardDeckSingleGame[firstCardsForComputerIndex];
            cardValueTextForComputer=firstCardForComputer.value;
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
        if(userPoints===21){
            this.setState({
                gameWin: true,
                activePassButton: true
            })
        }else if(userPoints>=22 && this.state.asTable.length!==2){
            this.setState({
                gameWinComputer: true,
                activePassButton: true,
            })
        }
        this.setState({
                userCards: actualUserCards,
                userPoints: userPoints,
        })}

    handlePassButton=()=>{
        this.handleComputerProcedure();
        const userActualPoints=this.state.userPoints;
        if(userActualPoints===21){
            this.setState({
                activePassButton: true,
                winPointsUser: true,
            })
        }
       else{
            this.setState({
                activePassButton: true,
            })
        }

    }

    handleCheckScore=(points)=>{
        const userPoints=this.state.userPoints;
        const computerPoints=points;
        const winResult = 21;
        const userAbsPoints=Math.abs(winResult-userPoints);
        const computerAbsPoints=Math.abs(winResult-computerPoints);
        if(userPoints<22 && computerPoints<22){
            if(userAbsPoints<computerAbsPoints){
                this.setState({
                    gameWin: true,
                })
            }else if(userAbsPoints>computerAbsPoints){
                this.setState({
                    gameWinComputer: true,
                })
            }
            else{
                this.setState({
                    remis: true,
                })
            }
        }else if(userPoints>=22 && computerPoints<22){
            this.setState({
                gameWinComputer: true,
            })
        }else if(computerPoints>=22 && userPoints<22){
            this.setState({
                gameWin: true,
            })
        }else{
            this.setState({
                remis: true,
            })
        }


    }

    handleBackButtonSinglePlayerMode=()=>{
        this.setState({
            gameStart: false,
            activePassButton: false,
            userCards:[],
            userPoints:0,
            asTable:[],
            gameWin: false,
            winPointsUser: false,

            computerCards:[],
            computerPoints:0,
            asTableComputer:[],
            computerActive: true,
            winPointsComputer: false,
            activePassButtonComputer: false,
            gameWinComputer: false,
            remis: false,
        })
    }

    handleComputerProcedure=()=>{
        let points = this.state.computerPoints;
        const deck = this.state.cardDeckSingleGame;
        let actualComputerCards = this.state.computerCards;
        while(this.state.computerActive===true){
            if(points<=17){
                let pointsFromAddingCard=0;
                let randomCardIndex = Math.floor(Math.random()*51);
                let addingCard = deck[randomCardIndex];
                this.checkAsComputer(addingCard);
                pointsFromAddingCard=this.countPoints(addingCard.value);
                actualComputerCards.push(addingCard);
                points=points+pointsFromAddingCard;
            }
            else if(points<=20){
                let randomNumber = Math.floor(Math.random()*2);
               if(randomNumber===1){
                   let pointsFromAddingCard=0;
                   let randomCardIndex = Math.floor(Math.random()*51);
                   let addingCard = deck[randomCardIndex];
                   this.checkAsComputer(addingCard);
                   pointsFromAddingCard=this.countPoints(addingCard.value);
                   actualComputerCards.push(addingCard);
                   points=points+pointsFromAddingCard;

               }else{
                   this.setState({
                       computerActive: false,
                       activePassButtonComputer: true,
                       computerCards: actualComputerCards,
                       computerPoints: points,
                   })
                   break;
               }
            }
            else if(points === 21){
                this.setState({
                    computerActive: false,
                    activePassButtonComputer: true,
                    computerCards: actualComputerCards,
                    computerPoints: points,
                    winPointsComputer: true,
                })
                break;
            }
            else{
                this.setState({
                    computerActive: false,
                    activePassButtonComputer: true,
                    computerCards: actualComputerCards,
                    computerPoints: points,
                })
                break;
            }
        }
        this.handleCheckScore(points);
    }

    render(){
        const {backButton} = this.props;
        return(
            <div className="mainContianer" style={{marginTop: '1vh'}}>
                <div className="gameTitle" >
                    <h1>Rozgrywka dla pojedyńczego gracza</h1>
                </div>
                <div className="contentContainer">
                    {this.state.gameStart? <div><SingleGame
                            buttonAdd={this.handleAddCard}
                            buttonPass={this.handlePassButton}
                            buttonBack={this.handleBackButtonSinglePlayerMode}
                            buttonPlayAgain={this.handleBackButtonSinglePlayerMode}
                            addButtonStatus={this.state.activePassButton}
                            passButtonStatus={this.state.activePassButtonStatus}
                            userCards={this.state.userCards}
                            userPoints={this.state.userPoints}
                            userWin={this.state.gameWin}
                            computerPoints={this.state.computerPoints}
                            computerStart={this.handleComputerProcedure}
                            computerWin={this.state.gameWinComputer}
                            remis={this.state.remis}/>
                        </div>:
                        <div className="buttonsContainer">
                            <button className='modeButton' onClick={this.handleTwoRandomCards}><span>Rozpocznij grę</span></button>
                            <button className='modeButtonBack' onClick={backButton}><span>Powrót do menu</span></button>
                        </div>}
                </div>


            </div>
        )
    }
}
export default SinglePlayerMode;