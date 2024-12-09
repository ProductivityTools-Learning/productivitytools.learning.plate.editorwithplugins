import React, { useState } from "react";

export interface IPTButtonProps
extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    label?:string
}

export const PTButton: React.FunctionComponent<IPTButtonProps>=(props)=>{
    const{label}=props;

    const [count,setCount]=useState<number>(0);

    const clickButton=()=>{setCount(count+1)}

    return(
        <p>
            <span>Counter: {count}</span>
            <button onClick={clickButton}>{label||"Click me!"}</button>
        </p>
    )
}