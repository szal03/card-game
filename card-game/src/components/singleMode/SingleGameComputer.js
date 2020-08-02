import React from "react";

const SingleGameComputer =(props)=>{
          const{computerPoints}=props;
           return(<div>
               Computer
               <p>Wynik komputera: {computerPoints}</p>
           </div>)



}
export default SingleGameComputer;