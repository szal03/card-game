import React from "react";
import MultiGame from "./MultiGame";
import '../style/ModeButton.css';
import '../style/MultiPlayerMode.css';


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
            remis: false,
            infoShow: false,
            summaryCardShow:false,
            showAlert:false,
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
        let inputValue=e.target.value;
        if(inputValue>4){
            inputValue=4;
        }
        else if(inputValue<2){
            inputValue=2
        }
        this.setState({
            numberOfUsers: inputValue,
        });

    }

    createPlayers=(number)=>{
        let table=[];
        for(let i=0;i<=number-1;i++){
            let arrayForCards=[];
            let cardValueText='';
            let points;
            let pointsFromCards=0;
            let actualAsTable=[];
            let win=false;
            let active=false;
            if(i===0){
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
                userId:i, name:`Gracz ${i+1}`,userCards:arrayForCards,asTable:actualAsTable,userPoints:pointsFromCards,userActiveStatus:active,gameWin:win, gameLose:false,showCards:false,
            })
        }
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
        else if(selectUserAsTable.length===2){
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
            if(selectUserActiveStatus===false && id+1!==usersTable.length){
                this.setState({
                    showAlert: true,
                })
            }
            usersTable[id].userPoints = selectUserPoints;
            usersTable[id].userCards = selectUserCards;
            usersTable[id].asTable=selectUserAsTable;
            usersTable[id].gameWin = selectUserGameWin;
            usersTable[id].userActiveStatus=selectUserActiveStatus;
            usersTable[id].gameLose=true;
            if(id+1!==usersTable.length){
                usersTable[id+1].userActiveStatus=true;
                this.setState({
                    usersTable: usersTable
                })
            }
            this.setState({
                usersTable: usersTable
            })
            if(id===usersTable.length-1){
                this.handlePassButton(id);
            }
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
        let selectPlayer = usersTableActive[id];
        let playerStatus=selectPlayer.userActiveStatus;
        playerStatus=false;
        usersTableActive[id].userActiveStatus = playerStatus;
        this.setState({
            usersTable: usersTableActive
        })
        if(id+1!==usersTableActive.length){
            usersTableActive[id+1].userActiveStatus = true;
            this.setState({
                usersTable: usersTableActive
            })
        }
        else{
            //sprawdź wyniki
            let remis;
            let nameWinner='';
            const usersToCheck=usersTableActive.filter(status=>!status.gameLose && !status.gameWin); // to są ci, którzy mięli <21 pkt
            if(usersToCheck.length===1){
                let winName = usersToCheck[0].name;
                let winID=usersToCheck[0].userId;
                usersTableActive[winID].gameWin = true;
                this.setState({
                    gameEnd:true,
                    gameWiner:winName,
                    usersTable: usersTableActive
                })
            }
            else if(usersToCheck.length===2){
                let userPoints1 = usersToCheck[0].userPoints;
                let user1Id=usersToCheck[0].userId;
                let user1name=usersToCheck[0].name;
                let userPoints2=usersToCheck[1].userPoints;
                let user2Id=usersToCheck[1].userId;
                let user2name=usersToCheck[1].name;
                if(userPoints1>userPoints2){
                    usersToCheck[0].gameWin = true;
                    usersTableActive[user1Id].gameWin=true;
                    nameWinner=user1name;
                }
                else if(userPoints1<userPoints2){
                    usersToCheck[1].gameWin = true;
                    usersTableActive[user2Id].gameWin=true;
                    nameWinner=user2name;
                }
                else{
                    remis=true;
                    nameWinner= user1name + '  '+user2name;
                }
                this.setState({
                        gameEnd:true,
                        gameWiner:nameWinner,
                        remis:remis,
                        usersTable: usersTableActive

                })
            }
            else if(usersToCheck.length>2){
                usersToCheck.sort((a,b)=>b.userPoints-a.userPoints);
                let firstValue=usersToCheck[0].userPoints;
                let firstValueId=usersToCheck[0].userId;
                let firstValueName=usersToCheck[0].name;
                let winnerTab=[];
                winnerTab.push(usersToCheck[0]);
                for(let i=1;i<=usersToCheck.length-1;i++){

                    if(firstValue===usersToCheck[i].userPoints){
                        winnerTab.push(usersToCheck[i]);
                    }
                }
                if(winnerTab.length>1){
                    for(let j=0;j<=winnerTab.length-1;j++){
                        let id = winnerTab[j].userId;
                        usersTableActive[id].gameWin = true;
                        nameWinner=nameWinner+' '+winnerTab[j].name+' ';
                    }
                    this.setState({
                        gameEnd:true,
                        gameWiner:nameWinner,
                        usersTable: usersTableActive
                    })
                }
                else{
                    usersTableActive[firstValueId].gameWin = true;
                    this.setState({
                        gameEnd:true,
                        gameWiner:firstValueName,
                        usersTable: usersTableActive
                    })
                }

            }
        }

    }

    handleBackButton=()=>{
        this.setState({
            usersTable:[],
            gameEnd:false,
            gameStart:false,
            submit: false,
            remis: false,
            gameWiner:'',
            persianEye:false,
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
            persianEye:false,
            remis: false
        })

    }

    handleShowInfo=()=>{
        this.setState({
            infoShow: true,
        })
    }

    handleHideInfo=()=>{
        setInterval(
            this.setState({
            infoShow: false,
        }), 3000);

    }

    handleShowCards=(id)=>{
        let usersTable =this.state.usersTable;
        usersTable[id].showCards = true;
        this.setState({
            usersTable: usersTable,
        })
    }

    handleButtonClose=(id)=>{
        let usersTable =this.state.usersTable;
        usersTable[id].showCards = false;
        this.setState({
            usersTable: usersTable,
        })
    }

    handleButtonCloseAlert=()=>{
        this.setState({
            showAlert: false,
        })
    }

    render(){
        const {backButton} = this.props;
        const {submit,
            gameStart,
            usersTable,
            gameEnd,
            gameWiner,
            persianEye,
            remis,infoShow,
            summaryCardShow,
            showAlert}=this.state;

        return(
            <div>
                <div className="gameTitle">
                    <h1> Rozgrywka dla wielu graczy</h1>
                </div>
                <div className="contentContainer">
                {!gameStart?  <div className="formContainer">
                    <form onSubmit={this.handleSubmit} noValidate>
                       <div className="labelAndInputBox">
                           <label htmlFor="numberOfUsers">
                               <span className="inputLabel">Wybierz liczbę graczy:</span></label>
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
                            <div className="infoBox"
                                 onMouseEnter={() => this.handleShowInfo()}
                                 onMouseLeave={() =>this.handleHideInfo()}>
                                <div className="infoInBox">
                                    <span>i</span>
                                </div>
                            </div>
                       </div>
                        {infoShow && (
                            <div className="infoText">W trybie dla wielu graczy minimalna ilość graczy wynosi 2 a maksymalna 4. Po wybraniu liczby graczy należy zatwierdzić swój wybór wybierając przycisk "ZATWIERDŹ LICZBĘ GRACZY"</div>
                        )}
                        <div className="buttonsContainer">
                            <button className="submitButtons"
                                    disabled={submit}
                            style={infoShow && !submit? {  boxShadow: '0px 20px 20px 1px rgba(99, 212, 113, .5)', transform: 'translateY(25%)'}:null}>
                                <span>Zatwierdź liczbę graczy</span></button>
                        </div>

                    </form>
                    <div className="buttonsContainer" style={infoShow? {transform: 'translateY(25%)'}:null}>
                        <button className='modeButton' disabled={!submit} onClick={this.handleGameStart}><span>Rozpocznij Grę</span></button>
                        <button className='modeButtonBack' onClick={backButton}><span>Powrót do menu</span></button>
                    </div>
            </div>:
                    <div>

                        <MultiGame
                            usersTable={usersTable}
                            addButton={this.handleAddCardButton}
                            passButton={this.handlePassButton}
                            gameEnd={gameEnd}
                            gameWiner={gameWiner}
                            backButton={this.handleBackButton}
                            buttonPlayAgain={this.handlePlayAgain}
                            persianEye={persianEye}
                            remis={remis}
                            buttonShowCards={this.handleShowCards}
                            summaryCardShow={summaryCardShow}
                            buttonClose={this.handleButtonClose}
                            showAlert={showAlert}
                            buttonCloseAlert={this.handleButtonCloseAlert}
                            />
                    </div>}
                </div>
            </div>
        )
    }
}
export default MultiPlayerMode;