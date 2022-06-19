import React, { useEffect, useMemo, useRef, useState } from "react";
import "./TrackList.css"
import i_play_1 from "../../Images/play_1.svg";
import i_pause_1 from "../../Images/pause_1.svg";
import i_clock from "../../Images/clock.svg";
import i_heart from "../../Images/heart.svg";
import i_threeDots from "../../Images/threedots.svg";

import { getFormattedTime, calculatePlaylistLength, formatFileSizeFromTracks } from "../../Logic/Utils"

export function TrackList({
    sortbyName,
    getSortArrowIconForName,
    sortbyDate,
    getSortArrowIconForDate,
    sortbyTime,
    getSortArrowIconForTime,
    handleTrackPopup,
    playButtonVisibilityStyles,
    toggleAudioTrack,
    toggleLiked,
    iconColours,
    colourPalette,
    selectedPlaylist,
    selectedTrack,
    styles,
}) {

    const playlistLength = useMemo(() => calculatePlaylistLength(selectedPlaylist), [selectedPlaylist])
    const formattedFileSize = useMemo(() => formatFileSizeFromTracks(selectedPlaylist.tracks), [selectedPlaylist])
    const [clickedOnTrack, setClickedOnTrack] = useState({
        id: null,
        event: null
    })

    useEffect(()=>{
        if(clickedOnTrack.event !== null)
            clickedOnTrack.event.style.background = colourPalette.side

    }, [colourPalette])

    useEffect(()=>{
        const hideClickedOnTrack = () => {
            if(clickedOnTrack.event !== null)
                clickedOnTrack.event.style.background = "none"
            setClickedOnTrack({
                id: null,
                event: null
            })
        }

        document.addEventListener("click", hideClickedOnTrack)

        return () => document.removeEventListener("click", hideClickedOnTrack)




    }, [clickedOnTrack])

 


    const changeBgColorOnClick = (trackID, e) => {
        e.stopPropagation()
        if(trackID === clickedOnTrack.id){
            e.target.style.background = "none"
            setClickedOnTrack({
                id: null,
                event: null
            })
           
            return
        }

        if(clickedOnTrack.event !== null)
            clickedOnTrack.event.style.background = "none"
        
        setClickedOnTrack({
            id: trackID,
            event: e.currentTarget
        })
       



        e.currentTarget.style.backgroundColor = colourPalette.side

    }

    const changeBgColorOnMouseEnter = (trackID, e) => {
        if (trackID === clickedOnTrack.id)
            return

        e.currentTarget.style.backgroundColor = colourPalette.side
    }

    const handleMouseLeaveBg = (trackID, e) => {

        if(trackID === clickedOnTrack.id)
            return 

        e.currentTarget.style.background = "none"
    }

   

    return (
        <div className="tracks-container">
            <div className="track-subdivisions">
                <h3
                    className="title-text"
                    style={{
                        color: colourPalette.secondary,
                    }}
                    onClick={sortbyName}
                >{`TITLE ${getSortArrowIconForName()}`}</h3>
                <div className="date-added-text-container">
                    <h3
                        className="date-added-text"
                        style={{
                            color: colourPalette.secondary,
                        }}
                        onClick={sortbyDate}
                    >{`DATE ADDED ${getSortArrowIconForDate()}`}</h3>
                </div>
                <div className="clock-icon-container" onClick={sortbyTime}>
                    <img
                        className="clock-icon"
                        src={i_clock}
                        alt="clock"
                        title="Track length"
                        style={iconColours.colourMode}
                    ></img>

                    <h3 style={{
                        color: colourPalette.secondary,
                    }}>{getSortArrowIconForTime()}</h3>
                </div>
            </div>
            <div
                className="divider-2"
                style={{
                    ...{
                        width: "100%",
                    },
                    ...styles.side,
                }}
            ></div>
            <div className="track-list">
                {selectedPlaylist.tracks.map((c) => (
                    <>
                        <div
                            className="track-card"
                            onContextMenu={(e) => handleTrackPopup(c, e)}
                            onMouseEnter={(e) => changeBgColorOnMouseEnter(c.id, e)}
                            onMouseLeave={e=>handleMouseLeaveBg(c.id, e)}
                            onClick={e=>changeBgColorOnClick(c.id, e)}
                            onDoubleClick={()=>toggleAudioTrack(c)}

                        >
                            <div className="play-and-title">
                                <img
                                    src={
                                        selectedTrack.playing &&
                                            c.id === selectedTrack.id
                                            ? i_pause_1
                                            : i_play_1
                                    }
                                    className="play-pause"
                                    alt="play-pause"
                                    style={{
                                        ...iconColours.colourMode,
                                        ...playButtonVisibilityStyles(c),
                                    }}
                                    onClick={() => toggleAudioTrack(c)}
                                ></img>
                                <h3
                                    className="track-title"
                                    style={{
                                        color: colourPalette.secondary,
                                    }}
                                >
                                    {c.name}
                                </h3>
                            </div>

                            <h3
                                className="date-created"
                                style={{
                                    color: colourPalette.secondary,
                                }}
                            >
                                {c.date}
                            </h3>
                            <div className="heart-time-more">
                                <img
                                    src={i_heart}
                                    style={
                                        c.liked
                                            ? iconColours.accent
                                            : iconColours.other
                                    }
                                    onClick={() => toggleLiked(c)}
                                    alt="like-button"
                                ></img>
                                <h3
                                    className="time"
                                    style={{
                                        color: colourPalette.secondary,
                                    }}
                                >
                                    {getFormattedTime(c.length)}
                                </h3>
                                <img
                                    src={i_threeDots}
                                    style={iconColours.colourMode}
                                    onClick={(e) => handleTrackPopup(c, e)}
                                    alt="three-dots"
                                ></img>
                            </div>
                        </div>
                        <div
                            className="divider-2"
                            style={{
                                ...{
                                    width: "100%",
                                },
                                ...styles.side,
                            }}
                        ></div>
                    </>
                ))}
            </div>
            <h3
                class="track-info"
                style={{
                    color: colourPalette.secondary,
                }}
            >{`${selectedPlaylist.tracks.length
                } TRACKS • ${playlistLength} MINUTES • ${formattedFileSize}`}</h3>
        </div>
    );
}
