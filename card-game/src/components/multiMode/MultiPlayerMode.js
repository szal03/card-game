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
               }
                arrayForCards.push(firstCard);
            }
            table.push({
                userId:i, name:`Gracz ${i+1}`,userCards:arrayForCards,asTable:actualAsTable,userPoints:pointsFromCards,userActiveStatus:false,gameWin:win,
            })
        }
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
        let newArr = this.state.usersTable;
        newArr[0].userActiveStatus=true;
        this.setState({
            gameStart:true,
            usersTable: newArr,
        })
    }

    handleAddCardButton=(id)=>{
        console.log("add button "+id);

    }

    render(){
        const {backButton} = this.props;
        const {submit, gameStart, usersTable}=this.state;
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
                addButton={this.handleAddCardButton}/>}


            </div>
        )
    }
}
export default MultiPlayerMode;