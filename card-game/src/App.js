import React from 'react';
import './App.css';
import ModeButton from "./components/ModeButton";


class App extends React.Component {


state={
    singleMode: false,
    multiMode: false,

}
    handleSingleGame=()=>{
        console.log("click single");
    }
    handleMultiGame=()=>{
        console.log("click multi");
    }



  render(){
      const singleModeText = "Pojedyńczy gracz";
      const multiModeText = "Wielu graczy";
      return (
          <div className="App">
              {
                  this.state.singleMode===false && this.state.multiMode===false ?
                      <div>
                          <h1>Wybierz tryb gry</h1>
                          <ModeButton text={singleModeText} click={this.handleSingleGame}/>
                          <ModeButton text={multiModeText} click={this.handleMultiGame}/>
                      </div>
                      : null
              }
          </div>
      );
  }
}

export default App;
