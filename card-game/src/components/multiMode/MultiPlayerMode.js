import React from "react";
import MultiGame from "./MultiGame";



class MultiPlayerMode extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            cardDeckMultiGame: props.deck,
            numberOfUsers: 2,
            usersTable:[],
            submit: false,
            gameStart: false,
            gameEnd:false,
            gameWiner:'',
            persianEye:false,
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

    handleChange=(e)=>{
        console.log(e.target.value);
        let playersNumber=e.target.value;
        this.setState({
            numberOfUsers: e.target.value,
        });

    }

    createPlayers=(number)=>{
        let index=this.state.usersTable.length+1;
        console.log(index);
        let table=[];
        for(let i=0;i<=number-1;i++){
            let arrayForCards=[];
            let cardValueText='';
            let points;
            let pointsFromCards=0;
            let actualAsTable=[];
            let win=false;
            let active=false;
            if(i==0){
                active=true;
            }
            for(let j=0;j<=1;j++){
                let firstCardsIndex = Math.floor(Math.random()*51);
                let firstCard = this.state.cardDeckMultiGame[firstCardsIndex];
                cardValueText=firstCard.value;
                points=this.countPoints(cardValueText);
                pointsFromCards=pointsFromCards+points;
               if(cardValueText==="ACE"){
                   actualAsTable.push(firstCard);
               }
               if(actualAsTable.length===2){
                   win=true;
                   this.setState({
                       persianEye:true,
                       gameEnd:true,
                       gameWiner: `Gracz ${i+1}`,
                   })
               }
                arrayForCards.push(firstCard);
            }
            table.push({
                userId:i, name:`Gracz ${i+1}`,userCards:arrayForCards,asTable:actualAsTable,userPoints:pointsFromCards,userActiveStatus:active,gameWin:win, gameLose:false,
            })
        }
      /*  const checkarr = table.filter(winner=>winner.gameWin);
        if(checkarr.length!=0){
            console.log("perskie oczko!");
            console.log(checkarr);
            this.setState({
                gameEnd:false,
                persianEye:true,
            })
        }*/
        console.log(table);
        this.setState({
            usersTable: table
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const playersNumber = this.state.numberOfUsers;
        this.createPlayers(playersNumber);
        this.setState({
            submit: true,
        })
    }

    handleGameStart=()=>{
        this.setState({
            gameStart:true,
        })
    }

    handleEndGame=()=>{
        let table = this.state.usersTable;
        for(let i=0;i<=table.length-1;i++){
                table[i].userActiveStatus=false;
        }
        this.setState({
                userTable:table,
        })

    }

    handleAddCardButton=(id)=>{
        let usersTable = this.state.usersTable;
        let selectPlayer = usersTable[id];
        let selectUserPoints = selectPlayer.userPoints;
        let selectUserCards=selectPlayer.userCards;
        let selectUserAsTable=selectPlayer.asTable;
        let selectUserGameWin=selectPlayer.gameWin;
        let selectUserActiveStatus=selectPlayer.userActiveStatus;
        let pointsFromCard=0;
        const deck = this.state.cardDeckMultiGame;
        let randomCardIndex = Math.floor(Math.random()*51);
        let addingCard = deck[randomCardIndex];
        pointsFromCard=this.countPoints(addingCard.value);
        selectUserPoints=selectUserPoints+pointsFromCard;
        if(addingCard.value==="ACE"){
            selectUserAsTable.push(addingCard);
        }
        selectUserCards.push(addingCard);
        if(selectUserPoints === 21){
            selectUserGameWin=true;
            let playerStatus=selectPlayer.userActiveStatus;
            playerStatus=false;
            usersTable[id].userActiveStatus=playerStatus;
            usersTable[id].userPoints = selectUserPoints;
            usersTable[id].userCards = selectUserCards;
            usersTable[id].asTable=selectUserAsTable;
            usersTable[id].gameWin = selectUserGameWin;
            usersTable[id].userActiveStatus=selectUserActiveStatus;
            this.setState({
                gameEnd:true,
                gameWiner:selectPlayer.name,
                usersTable: usersTable,
            })
            this.handleEndGame()
        }
        else if(selectUserAsTable.length==2){
            selectUserGameWin=true;
            usersTable[id].userPoints = selectUserPoints;
            usersTable[id].userCards = selectUserCards;
            usersTable[id].asTable=selectUserAsTable;
            usersTable[id].gameWin = selectUserGameWin;
            usersTable[id].userActiveStatus=selectUserActiveStatus;
            this.setState({
                gameEnd:true,
                gameWiner:selectPlayer.name,
                usersTable: usersTable,
                persianEye:true,
            })
            this.handleEndGame()
        }
        else if(selectUserPoints>=22 && selectUserAsTable.length!==2){
            selectUserGameWin=false;
            selectUserActiveStatus=false;
            usersTable[id].userPoints = selectUserPoints;
            usersTable[id].userCards = selectUserCards;
            usersTable[id].asTable=selectUserAsTable;
            usersTable[id].gameWin = selectUserGameWin;
            usersTable[id].userActiveStatus=selectUserActiveStatus;
            usersTable[id].gameLose=true;
            usersTable[id+1].userActiveStatus=true;
            this.setState({
                usersTable: usersTable
            })
        }
        else{
            usersTable[id].userPoints = selectUserPoints;
            usersTable[id].userCards = selectUserCards;
            usersTable[id].asTable=selectUserAsTable;
            this.setState({
                usersTable: usersTable
            })
        }
    }

    handlePassButton=(id)=>{
        let usersTableActive = this.state.usersTable;
        if(id+1 === usersTableActive.length){
            //też ustawić status disable
            let selectPlayer = usersTableActive[id];
            let playerStatus=selectPlayer.userActiveStatus;
            playerStatus=false;
            usersTableActive[id].userActiveStatus = playerStatus;
            this.setState({
                usersTable: usersTableActive
            })
            const winer = usersTableActive.filter(status=>status.gameWin &&  !status.gameLose);
            console.log("========");
            console.log(winer);
            console.log("========");
            const winer2=usersTableActive.filter(status=>!status.gameLose);
            console.log("========");
            console.log(winer2);
            console.log("========");
            if(winer.length===0 && winer2.length>1){
                let compareTable = [];
                let diff=0;
                for(let i=0;i<=usersTableActive.length-1;i++){
                    let tmpPlayerPoints=winer2[i].userPoints;
                    diff=21-tmpPlayerPoints;
                    compareTable.push(diff)
                }
                let firstValue=compareTable[0]
                let index=0;
                for(let i=1;i<=compareTable.length;i++){
                    if(compareTable[i]<firstValue){
                        firstValue=compareTable[i];
                        index=i;
                    }
                }
                console.log(index);
                let selectWiner = winer2[index];
                let selectWinername=selectWiner.name;
                let selectWinergameWin=selectWiner.gameWin;
                this.setState({
                    gameEnd:true,
                    gameWiner:selectWinername,
                })
            }
            else{ //todo to fix !!!! co się dzieje kiedy ostatni user wciśnie pass? przerób jeszcze raz tą funkcje
                let selectPlayer = usersTableActive[id];
                let nextPlayer = usersTableActive[id+1];
                let playerStatus=selectPlayer.userActiveStatus;
                let nextPlayerStatus=nextPlayer.userActiveStatus;
                playerStatus=false;
                nextPlayerStatus=true;
                usersTableActive[id].userActiveStatus = playerStatus;
                usersTableActive[id+1].userActiveStatus = nextPlayerStatus;
                this.setState({
                    usersTable: usersTableActive
                })
            }
          //co jak ktoś ma po tyle samo pkt?
        }else{

        }


    }

    handleBackButton=()=>{
        this.setState({
            gameStart:false,
            submit: false,
        })
    }

    handlePlayAgain=()=>{
        const n=this.state.numberOfUsers;
        this.createPlayers(n);
        this.setState({
            gameStart:false,
            submit: false,
            gameEnd:false,
            gameWiner:'',
        })

    }

    render(){
        const {backButton} = this.props;
        const {submit, gameStart, usersTable, gameEnd, gameWiner, persianEye}=this.state;
        return(
            <div>Rozgrywka dla wielu graczy
                {!gameStart?  <div> <form onSubmit={this.handleSubmit} noValidate>
                        <label htmlFor="numberOfUsers">Wpisz liczbę graczy
                            <input
                                type="number"
                                id="numberOfUsera"
                                name="usersNumber"
                                step="1"
                                min="2"
                                max="4"
                                value={this.state.numberOfUsers}
                                onChange={this.handleChange}
                                disabled={submit}/>
                        </label>
                        <button disabled={submit}>Zatwierdź liczbę graczy</button>
                    </form>
                    <div className="buttonsContainer">
                    <button disabled={!submit} onClick={this.handleGameStart}><span>Rozpocznij Grę</span></button>
                    <button onClick={backButton}>Powrót do menu</button>
                    </div></div>:<MultiGame
                    usersTable={usersTable}
                addButton={this.handleAddCardButton}
                passButton={this.handlePassButton}
                gameEnd={gameEnd}
                gameWiner={gameWiner}
                backButton={this.handleBackButton}
                buttonPlayAgain={this.handlePlayAgain}
                persianEye={persianEye}
                />}


            </div>
        )
    }
}
export default MultiPlayerMode;