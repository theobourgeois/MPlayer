import { useState, useEffect, useDeferredValue } from "react"


export const useSearch = (setSelectedPlaylistTracks, selectedPlaylist, colourPalette) => {

    const [showingSearchInput, setShowingSearchInput] = useState(false)
    const [showingSearchIcon, setShowingSearchIcon] = useState(true)
    const [searchValue, setSearchValue] = useState("")

    const deferredSearchValue = useDeferredValue(searchValue)
    const [prevPlaylistTracks, setPrevPlaylistTracks] = useState(selectedPlaylist.tracks)

    useEffect(()=>{
        if(showingSearchIcon)
        setPrevPlaylistTracks(selectedPlaylist.tracks)

    },[selectedPlaylist])

    const handleSearch = ()=>{
        const currentTracks = prevPlaylistTracks
        const newTracks = []

        for(let i = 0; i < currentTracks.length; i++){
            if(currentTracks[i].name.toLowerCase().includes(deferredSearchValue.toLowerCase())){
                newTracks.push(currentTracks[i]) 

                
            }
            




        }
        setSelectedPlaylistTracks(newTracks)

        



    }

    useEffect(()=>{
        
            handleSearch()

    }, [deferredSearchValue])






    useEffect(()=>{

        const hideSearch = () => {
            setShowingSearchInput(false)
            setShowingSearchIcon(true)
        }
        document.addEventListener('click', hideSearch)

        return () => document.removeEventListener('click', hideSearch)

    },[])


    const searchIconOnMouseEnter = e => e.currentTarget.style.backgroundColor = colourPalette.side
    const searchIconOnMouseLeave = e => e.currentTarget.style.background = "none"

    const searchVisibilityStyles = {
        transform: showingSearchInput ? "scaleX(1)" : "scaleX(0)",
    }

    const searchIconVisibilityStyles = {
        display: showingSearchIcon ? "block" : "none"
    }

    const toggleSearchShowing = e => {
        e.stopPropagation()
        setShowingSearchInput(showingSearchInput ? false : true)
        setShowingSearchIcon(showingSearchInput ? true : false)
    }


    const handleSearchValueChange = e => {
        setSearchValue(e.target.value)
    }

    return {
        searchIconVisibilityStyles, 
        searchIconOnMouseEnter, 
        searchIconOnMouseLeave, 
        toggleSearchShowing,
        searchValue,
        handleSearchValueChange,
        searchVisibilityStyles
    }


}


export default useSearch