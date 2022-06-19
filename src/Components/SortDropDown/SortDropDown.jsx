import React, { Component } from "react";
import { useSortDropDown } from "../../Hooks/useSortDropDown";
import "./SortDropDown.css"




export const SortDropDown = ({ styles, colourPalette, sortbyDate, sortbyName, sortbyTime, currentSorting }) => {


     const sortOptions = {
        "Date added": sortbyDate,
        "Title": sortbyName,
        "Duration": sortbyTime
    }
    


    const { 
        toggleShowingDropDown,
        getSortName, 
        getDropDownArrow, 
        getSortCall, 
        dropDownVisibilityStyles,
        onMouseEnterDropDownOption, 
        onMouseLeaveDropDownOption} = useSortDropDown(sortOptions, currentSorting, colourPalette)

    return (
        <div className="sort-drop-down-container">
            <div className="sort-name-container" style={styles.side} onClick={toggleShowingDropDown}>
                <h3 className="sort-name" style={{color: colourPalette.secondary}}>{getSortName()}</h3>
                <h3 className="sort-arrow" style={{color: colourPalette.secondary}}>{getDropDownArrow()}</h3>

                
            </div>
            <div className="sort-drop-down" style={{...styles.side,...dropDownVisibilityStyles}}>

                <h4 style={{color: colourPalette.secondary}}>SORT BY</h4>
                <div className="sort-items">
                    {Object.keys(sortOptions).map(sortOption=>
                        <div className="sort-option" style={styles.side} onClick={()=>getSortCall(sortOption)} onMouseEnter={onMouseEnterDropDownOption} onMouseLeave={onMouseLeaveDropDownOption}> 
                            <h3 style={{color: colourPalette.secondary}}>{sortOption}</h3> 
                        </div>
                    )}
                </div>
            </div>
        </div>
           

    )
}


export default SortDropDown