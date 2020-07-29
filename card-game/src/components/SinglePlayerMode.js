import React from "react";
import SingleGame from "./SingleGame";

class SinglePlayerMode extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            points: 0,
            startSingleGame: props.active,
            deckID:'',
            cardsTable: []

        }
    }


    handleStartSingleGame=()=>{
        console.log("start game");

        const query ="https://deckofcardsapi.com/api/deck/new/draw/?count=51";

        fetch(query).then(response=>{
            if(response.ok){
                //console.log(response);
                return response
            }
            throw Error(response.status)
        }).then(response => response.json())
            .then(data => {console.log(data.cards);
            this.setState({
                cardsTable: data.cards,
            })

            })
            .catch(error=>console.log(error))

        this.setState({
            startSingleGame: true,
        })


    }

    handleAddCard = () =>{
        console.log(this.state.cardsTable);
        
    }

    render(){
        return(
            <div>
                <h1>Single player</h1>
                {this.state.startSingleGame === false ?
                    <div><button onClick={this.handleStartSingleGame}>Rozpocznij grę</button>
                    </div>
                    :<div><SingleGame addButton={this.handleAddCard}/></div>}
                <button onClick={this.props.buttonFunction}>Powrót</button>


            </div>

        )
    }

}

export default SinglePlayerMode;