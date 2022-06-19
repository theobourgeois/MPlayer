import { useState, useEffect } from "react"

export const useSortDropDown = (sortOptions, currentSorting, colourPalette) => {

    const [showingDropDown, setShowingDropDown] = useState(false)


    useEffect(()=>{
        const hideDropDown = () => setShowingDropDown(false)
        document.addEventListener('click', hideDropDown)

        return () => document.removeEventListener('click', hideDropDown)

    },[])

    const getSortCall = (functionCall) => {
        const callFunction = sortOptions[functionCall]
        callFunction()
        setShowingDropDown(false)

    }

    const getSortName = () => {
        if(currentSorting === "DATE")
            return "Date added"
        if(currentSorting === "NAME")
            return "Title"
        if(currentSorting === "TIME")
            return "Duration"

    }


    

    const onMouseEnterDropDownOption = e => {
        e.currentTarget.style.backgroundColor = colourPalette.body
    }

    const onMouseLeaveDropDownOption = e => {
        e.currentTarget.style.backgroundColor = colourPalette.side
    }

    const dropDownVisibilityStyles = {
        transform: showingDropDown ? "translate(1em, 2em) scaleY(1)" : "translate(1em, 2em) scaleY(0)"
    }

    const toggleShowingDropDown = e => {
        e.stopPropagation()
        setShowingDropDown(showingDropDown ? false : true)
    }
    

    const getDropDownArrow = () => { return showingDropDown ? "▲" : "▼" }
       





    return {
        toggleShowingDropDown,
        getSortName, 
        getDropDownArrow, 
        sortOptions,
        getSortCall, 
        dropDownVisibilityStyles ,
        onMouseEnterDropDownOption, 
        onMouseLeaveDropDownOption,
        

    }

}

export default useSortDropDown