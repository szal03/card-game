import React from "react";

class SinglePlayerMode extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            points: 0,
            startSingleGame: props.active,

        }
    }


    handleStartSingleGame=()=>{
        console.log("start game");
        this.setState({
            startSingleGame: true,
        })
    }

    render(){
        return(
            <div>
                <h1>Single player</h1>
                {this.state.startSingleGame === false ?
                    <div><button onClick={this.handleStartSingleGame}>Rozpocznij grę</button>
                    </div>
                    :<div>Gra!</div>}
                <button onClick={this.props.buttonFunction}>Powrót</button>


            </div>

        )
    }

}

export default SinglePlayerMode;