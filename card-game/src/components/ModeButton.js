import React from "react";
import './style/ModeButton.css'


const ModeButton=(props)=>{



    return(
        <button className='modeButton'
                onClick={props.click}><span>{props.text}</span></button>
    )
}
export default ModeButton;