import React from "react";

const SingleGameComputer =(props)=>{
          const{computerPoints}=props;
           return(<div>
              <h1>Przeciwnik</h1>
               <div className="playerScore">
                   <span style={computerPoints>21? {color: "red"}:null}>Wynik komputera: {computerPoints}</span>
               </div>

           </div>)



}
export default SingleGameComputer;