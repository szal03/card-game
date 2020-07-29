import React from "react";


const ModeButton = (props) =>{
    return(
        <div>
            <button onClick={props.click}>{props.text}</button>
        </div>
    )
}

export default ModeButton;