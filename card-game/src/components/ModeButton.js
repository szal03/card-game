import React from "react";

const ModeButton=(props)=>{
    return(
        <button onClick={props.click}>{props.text}</button>
    )
}
export default ModeButton