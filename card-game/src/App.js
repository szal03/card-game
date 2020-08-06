import React from 'react';
import './App.css';
import ModeButton from "./components/ModeButton";
import SinglePlayerMode from "./components/singleMode/SinglePlayerMode";
import MultiPlayerMode from "./components/multiMode/MultiPlayerMode";


class App extends React.Component {
state={
    singleMode: false,
    multiMode: false,
    cardDeck:[],

}

    handleSingleGame=()=>{
        this.setState({
            singleMode: true,
        })
    }

    handleMultiGame=()=>{
        this.setState({
            multiMode: true,
        })
    }

    handleBackButton=()=>{
        this.setState({
            singleMode: false,
            multiMode: false,
        })
    }

    componentDidMount() {
        const query ="https://deckofcardsapi.com/api/deck/new/draw/?count=51";
        fetch(query).then(response=>{
            if(response.ok){
                return response
            }
            throw Error(response.status)
        }).then(response => response.json())
            .then(data => {console.log(data.cards);
                this.setState({
                    cardDeck: data.cards,
                })})
            .catch(error=>console.log(error))
    }


    render(){
      const singleModeText = "Pojedyńczy gracz";
      const multiModeText = "Wielu graczy";
      return (
          <div className="App">
              <div className="AppContent">
              {
                  this.state.singleMode===false && this.state.multiMode===false ?
                      <div className="modeGameContainer">
                          <h1>Wybierz tryb gry</h1>
                          <div className="buttonsContainer">
                              <ModeButton text={singleModeText} click={this.handleSingleGame}/>
                              <ModeButton text={multiModeText} click={this.handleMultiGame}/>
                          </div>
                          <div>
                              <div>

                              </div>
                          </div>
                      </div>
                      : null
              }
              {this.state.singleMode ? <SinglePlayerMode
                  backButton={this.handleBackButton}
                  deck={this.state.cardDeck}/> : null}
              {this.state.multiMode ? <MultiPlayerMode
                  backButton={this.handleBackButton}
                  deck={this.state.cardDeck}/> : null}
              </div>
          </div>
      );
  }
}

export default App;
