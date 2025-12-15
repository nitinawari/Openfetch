"use client"
import clsx from "clsx";
import React from "react";


interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>{
    children:React.ReactNode;
}

export const Label = ({children , className , ...props}: LabelProps)=>{
    return(
        <label 
        className = {clsx("text-sm font-medium " , className)}
        {...props}
        >
            {children}
        </label>
    );

}
