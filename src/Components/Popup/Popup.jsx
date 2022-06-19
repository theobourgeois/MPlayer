import React, { memo, useEffect, useState } from "react";
import "./Popup.css"

const branchObj = {
    array: [],
    function: ()=>{}
}

const Popup = ({styles, colourPalette, isShowing=true, positionStyles, track, options, popupType}) =>{

   
    const [currentBranch, setCurrentBranch] = useState(branchObj)
    const [isBranchShowing, setBranchShowing] = useState(false)

    const handlePopupOnMouseEnter = e => e.currentTarget.style.background = colourPalette.popupSide
    const handlePopupOnMouseLeave = e => e.currentTarget.style.background = "none"
    const displayStyle = {
        display: isShowing ? "block" : "none"
    }

    const getBranchDisplayStyle ={
        display: isBranchShowing && isShowing ? "block" : "none"
    }

    const trackPopupFunctionCall = functionCall => {
        const callFunction = options[functionCall]

        if(popupType === "PLAYLIST"){
            callFunction()
            return 
        }

        switch(functionCall){
            case "Add to Queue":
                callFunction(track)
                break
            case "Delete":
                callFunction(track)
                break
            case "like":
                callFunction(track)
                break
            default:
                break;
        


        }
    }

    const handleMouseEnter = (name, e) =>{
        handlePopupOnMouseEnter(e)
        handleBranching(name)
    }


    const isBranch = optionName => {
        const result = typeof(options[optionName]) === "object"
        return result

    }

    const handleBranching = optionName => {
        if(!isBranch(optionName)){
            setBranchShowing(false)
            return 
        }
        setBranchShowing(true)  
        setCurrentBranch(options[optionName])
            
    }

    const branchFunctionCall = element => {
        currentBranch.function(element, track)
        console.log(element)
    }

    useEffect(()=>{
        if(!isShowing)
            setBranchShowing(false)
    }, [isShowing])

    
    const getOptionName = option =>{
        if(option !== "like")
            return option
       
        return track.liked ? "Remove from Liked Tracks" : "Add to Liked Tracks" 
    }

    const arrowVisibilityStyle = optionName => {
        return {display: isBranch(optionName) ? "block" : "none"}
    }

    


    return (
        <>
        <div className="popup-container" style={{...styles.popupBody,...displayStyle,...positionStyles}}>
            {Object.keys(options).map(c=>
                <div className="popup-options" onMouseEnter={e=>handleMouseEnter(c, e)} onMouseLeave={handlePopupOnMouseLeave} onClick={()=>trackPopupFunctionCall(c)}>
                    <h3 style={{color: colourPalette.secondary}}>{getOptionName(c)}</h3>
                    <h3 style={{...{color: colourPalette.secondary},...arrowVisibilityStyle(c)}}>▶</h3>
                </div> 

            )}
           
        </div>
        <div className="branch-container" style={{...styles.popupBody,...getBranchDisplayStyle,...positionStyles}} onMouseLeave={()=>setBranchShowing(false)}>
            {currentBranch.array.map(c =>
                <div  className="popup-options" onMouseEnter={handlePopupOnMouseEnter} onMouseLeave={handlePopupOnMouseLeave} onClick={()=>branchFunctionCall(c)}>
                    <h3 style={{color: colourPalette.secondary}}>{c.name}</h3>
                </div> 
            )}
        </div> 
        </>

    )


}

export default memo(Popup)
