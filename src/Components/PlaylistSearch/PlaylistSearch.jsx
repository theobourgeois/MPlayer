import React, {Component, } from "react";
import useSearch from "../../Hooks/useSearch";
import i_search from "../../Images/search.svg"
import "./PlaylistSearch.css"

export const PlaylistSearch = ({styles, colourPalette, iconColours, setSelectedPlaylistTracks, selectedPlaylist}) => {

    const { 
        searchIconVisibilityStyles, 
        searchIconOnMouseEnter, 
        searchIconOnMouseLeave, 
        toggleSearchShowing,
        searchValue,
        handleSearchValueChange,
        searchVisibilityStyles
    } = useSearch(setSelectedPlaylistTracks, selectedPlaylist, colourPalette)


    return (
        <div className="playlist-search"> 
            <div className="search-icon-container" style={searchIconVisibilityStyles} onMouseEnter={searchIconOnMouseEnter} onMouseLeave={searchIconOnMouseLeave} onClick={toggleSearchShowing}>
                <img src={i_search} style={iconColours.colourMode} alt="search"></img>
            </div>
            <div className="search-input-container" onClick={e=>e.stopPropagation()} style={{...searchVisibilityStyles,...styles.side}}>
                <div className="search-icon-container-double" >
                    <img src={i_search} style={iconColours.colourMode} alt="search"></img>
                </div>
                <input value={searchValue} onChange={handleSearchValueChange} type="search" placeholder="Search..." style={{...styles.side,...{color: colourPalette.secondary}}}></input>
            </div>
        </div>           
    )
}


export default PlaylistSearch