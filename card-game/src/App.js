import React from 'react';
import './App.css';
import ModeButton from "./components/ModeButton";
import SinglePlayerMode from "./components/SinglePlayerMode";
import MultiPlayerMode from "./components/MultiPlayerMode";

const singleGame="Jeden gracz";
const multiplayerGame="Wielu graczy";

class App extends React.Component {

state={
    singlePlayerActive: false,
    multiplayerActive: false,
    startGame: false,

}

handleSingleGame=()=>{
    this.setState({
        singlePlayerActive: true,
        multiplayerActive: false,
    })
}

    handleMultiGame=()=>{
        console.log("multi game");

        this.setState({
            singlePlayerActive: false,
            multiplayerActive: true,
        })
    }

    handleBackButton=()=>{
        console.log("back to menu");

        this.setState({
            singlePlayerActive: false,
            multiplayerActive: false,
            startGame: false,
        })

    }

  render(){
      return (
          <div className="App">
              {
                  this.state.singlePlayerActive===false && this.state.multiplayerActive===false ?
                      <div>
                          <h1>Wybierz tryb gry</h1>
                          <ModeButton text={singleGame} click={this.handleSingleGame}/>
                          <ModeButton text={multiplayerGame} click={this.handleMultiGame}/>
                      </div>
                      : null
              }
              {this.state.singlePlayerActive ? <SinglePlayerMode buttonFunction={this.handleBackButton} active={this.state.startGame}/> : null}
              {this.state.multiplayerActive ? <MultiPlayerMode buttonFunction={this.handleBackButton} active={this.state.startGame}/> : null}
          </div>
      );
  }
}

export default App;
