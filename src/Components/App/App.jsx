import { SidePanel } from './../SidePanel/SidePanel';
import { Queue } from './../Queue/Queue';
import { TrackList } from "./../TrackList/TrackList";
import { Header } from "./../Header/Header";
import { PlaylistSearch } from "./../PlaylistSearch/PlaylistSearch"
import { SortDropDown } from "./../SortDropDown/SortDropDown"

import Popup from "../Popup/Popup";
import usePopup from "../../Hooks/usePopup";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import useModal from "../../Hooks/useModal";
import useTheme from "../../Hooks/useTheme";
import usePlayback from "../../Hooks/usePlayback";
import useQueue from "../../Hooks/useQueue";
import useFileInput from "../../Hooks/useFileInput";
import useSort from "../../Hooks/useSort";

import "./App.css";
import i_play_1 from "../../Images/play_1.svg";
import i_threeDots from "../../Images/threedots.svg";

import i_edit from "../../Images/edit.svg";
import i_upload from "../../Images/upload.svg";
import i_cancel from "../../Images/cancel.svg";

import { ellipsize, calculatePlaylistLength } from "../../Logic/Utils";


import {
    useEffect, useMemo
} from "react";
import React from 'react';
import useAverageColor from '../../Hooks/useAverageColor';



function App() {

  

    const { colourPalette, styles, toggleDarkMode, iconColours } = useTheme();

    const {
        queue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        dequeue,
        queueStyleLogic,
        toggleShowingQueue,
    } = useQueue();

    const {
        selectedTrack,
        selectedTrackRef,
        setPlaying,
        toggleAudioTrack,
        selectedPlaylist,
        toggleAudio,
        playlists,
        setPlaylists,
        addToPlaylist,
        updatePlaylist,
        setPlaylistNameAndDescription,
        handleClickOnPlaylist,
        setSelectedPlaylistCover,
        setSelectedPlaylistTracks,
        removeFromSelectedPlaylist,
        addToSelectedPlaylist,
        toggleLiked,
        getCoverFromTrack,
        startPlaylist,
        setSelectedPlayist,
        showLikedTracks
        
    } = usePlayback();

    const {
        popupTrack,
        handleTrackPopup,
        handlePlaylistPopup,
        popupShowing,
        handleBodyClick,
        popupType,
        popupPostionStyle,
    } = usePopup();

    const {
        handleAudioFile,
        handleImageFile,
        uploadingVisibilityStyle,
        uploadProgress,
        cancelUpload,
    } = useFileInput(
        setSelectedPlaylistCover,
        addToSelectedPlaylist,
        selectedPlaylist
    );

    const {
        showingModal,
        handleCreatePlaylistModal,
        handleEditPlaylistModal,
        hideModal,
        modalStyles,
        getModalCover,
        getModalFileInputFunc,
        getModalSumbitFunc,
        getModalTitle,
        nameRef,
        descRef,
        handleEditDetailsImageFile,
    } = useModal(
        setSelectedPlaylistCover,
        playlists,
        setPlaylists,
        selectedPlaylist,
        handleImageFile,
        setPlaylistNameAndDescription,
        setSelectedPlayist
    );

    const {
        sortbyDate,
        sortbyName,
        sortbyTime,
        getSortArrowIconForDate,
        getSortArrowIconForName,
        getSortArrowIconForTime,
        currentSorting
    } = useSort(setSelectedPlaylistTracks, selectedPlaylist);

    const { avgColor, avgColorStyles } = useAverageColor(selectedPlaylist.cover, colourPalette)

    

    const handleMouseEnterBg = (e, target) => {
        switch (target) {
            case "body":
                e.currentTarget.style.background = colourPalette.body;
                break;
            case "side":
                e.currentTarget.style.background = colourPalette.side;
                break;
            case "secondary":
                e.currentTarget.style.background = colourPalette.secondary;
                break;
            case "sideDivider":
                e.currentTarget.style.background = colourPalette.sideDivider;
                break;
            default: 
                break;
        }
    };

    const handleMouseLeaveBg = (e) =>
        (e.currentTarget.style.background = "none");

    const playButtonVisibilityStyles = (c) => {
        if (c.id === selectedTrack.id) return { opacity: "100" };
        return { display: "block" };
    };

    const trackPopup = {
        "Add to Queue": addToQueue,
        "Add to Playlist": {
            array: playlists,
            function: addToPlaylist,
        },
        like: toggleLiked,
        Delete: removeFromSelectedPlaylist,
    };

    const playlistPopup = {
        "Edit Details": () => handleEditPlaylistModal(),
    };

    const getPopupOptions = () => {
        if (popupType === "TRACK") return trackPopup;
        if (popupType === "PLAYLIST") return playlistPopup;
    };

    const uploadButtonVisibilityStyle = {
        opacity: selectedPlaylist.id === 1 ? "0" : "100"
    }


    useEffect(() => {
        localStorage.setItem("colourPalette", colourPalette);
    }, [colourPalette]);

    const playlistLength = useMemo(() => calculatePlaylistLength(selectedPlaylist), [selectedPlaylist])
    const getSecondaryText = useMemo(()=>{
        const trackLength = selectedPlaylist.tracks.length
        const tracksText = trackLength > 1 ? "TRACKS" : "TRACK"
        
       
        const date = new Date(selectedPlaylist.date)
         
        const isLikedTrack = selectedPlaylist.id === 1

        if(isLikedTrack)
            return `${trackLength} ${tracksText}, ${playlistLength} MINUTES`


        return `${trackLength} ${tracksText}, ${playlistLength} MINUTES, ${date.getFullYear()}`



    }, [selectedPlaylist])

    



    return (
        <div onClick={handleBodyClick}>
            <PlaylistModal
                iconColours={iconColours}
                colourPalette={colourPalette}
                styles={styles}
                hideModal={hideModal}
                modalStyles={modalStyles}
                getModalCover={getModalCover}
                getModalFileInputFunc={getModalFileInputFunc}
                getModalSumbitFunc={getModalSumbitFunc}
                getModalTitle={getModalTitle}
                descRef={descRef}
                nameRef={nameRef}
            />

            <Popup
                track={popupTrack}
                colourPalette={colourPalette}
                styles={styles}
                isShowing={popupShowing}
                positionStyles={popupPostionStyle}
                options={getPopupOptions()}
                popupType={popupType}
            />

            <Header
                updatePlaylist={updatePlaylist}
                showingModal={showingModal}
                toggleAudio={toggleAudio}
                toggleAudioTrack={toggleAudioTrack}
                selectedTrack={selectedTrack}
                selectedPlaylist={selectedPlaylist}
                startPlaylist={startPlaylist}
                styles={styles}
                iconColours={iconColours}
                colourPalette={colourPalette}
                selectedTrackRef={selectedTrackRef}
                setPlaying={setPlaying}
                toggleShowingQueue={toggleShowingQueue}
                toggleDarkMode={toggleDarkMode}
                queue={queue}
                dequeue={dequeue}
                getCoverFromTrack={getCoverFromTrack}
                handleTrackPopup={handleTrackPopup}
            />

            <div className="main-container" style={avgColorStyles}>

                <SidePanel
                    handleMouseEnterBg={handleMouseEnterBg}
                    handleMouseLeaveBg={handleMouseLeaveBg}
                    handleCreatePlaylistModal={handleCreatePlaylistModal}
                    handleClickOnPlaylist={handleClickOnPlaylist}
                    handlePlaylistPopup={handlePlaylistPopup}
                    iconColours={iconColours}
                    colourPalette={colourPalette}
                    styles={styles}
                    playlists={playlists}
                    avgColor={avgColor}
                    showLikedTracks={showLikedTracks}
                />

                <div className="body-container">
                    <div className="body-spacing"><div></div></div>
                    <div className="playlist-content-container">
                        <div className="cover-text-container">
                            <div
                                className="cover-container"
                                style={styles.secondary}
                            >
                                <img src={selectedPlaylist.cover} alt="cover"></img>

                                <div className="choose-photo-main">
                                    <input
                                        id="img-file-input"
                                        type="file"
                                        onChange={(e) =>
                                            handleImageFile(
                                                e,
                                                handleEditDetailsImageFile
                                            )
                                        }
                                    ></input>
                                </div>
                            </div>
                            <div className="options-container">
                                <div className="titles-and-more">
                                    <div>
                                        <div
                                            className="title-and-edit"
                                            onClick={handleEditPlaylistModal}
                                        >
                                            <h1
                                                className="title"
                                                style={{
                                                    color: colourPalette.secondary,
                                                }}
                                                title={selectedPlaylist.name}
                                            >
                                                {ellipsize(selectedPlaylist.name)}
                                            </h1>
                                            <img
                                                src={i_edit}
                                                className="edit"
                                                alt="edit"
                                                style={iconColours.colourMode}
                                            ></img>
                                        </div>

                                        <h3
                                            className="file-title"
                                            style={{
                                                color: colourPalette.secondary,
                                            }}
                                        >{getSecondaryText}</h3>
                                        <h3
                                            className="playlist-description"
                                            style={{
                                                color: colourPalette.secondary,
                                            }}
                                        >
                                            {selectedPlaylist.description}
                                        </h3>
                                    </div>
                                    <img
                                        src={i_threeDots}
                                        onClick={handlePlaylistPopup}
                                        style={iconColours.colourMode}
                                        alt="three-dots"
                                    ></img>
                                </div>

                                <div className="playback-buttons">
                                   
                                    <div
                                        className="play-button"
                                        onClick={startPlaylist}
                                    >
                                        <img
                                            src={i_play_1}
                                            alt="play"
                                            style={iconColours.white}
                                        ></img>
                                        <p>Play</p>
                                    </div>
                                    <div className="upload-button" style={uploadButtonVisibilityStyle}>
                                        <img src={i_upload} alt="upload-file"></img>
                                        <label for="file-input">Upload</label>
                                        <input
                                            id="file-input"
                                            type="file"currentSorting
                                            multiple="multiple"
                                            onChange={handleAudioFile}
                                        ></input>
                                    </div>
                                    <div className="search-and-sort">
                                        <PlaylistSearch 
                                            styles={styles} 
                                            colourPalette={colourPalette} 
                                            iconColours={iconColours}
                                            setSelectedPlaylistTracks={setSelectedPlaylistTracks} 
                                            selectedPlaylist={selectedPlaylist}
                                        />
                                        <SortDropDown 
                                            styles={styles} 
                                            colourPalette={colourPalette}
                                            sortbyDate={sortbyDate}
                                            sortbyName={sortbyName}
                                            sortbyTime={sortbyTime}
                                            currentSorting={currentSorting}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        

                        <div
                            className="upload-progress-container"
                            style={uploadingVisibilityStyle}
                        >
                            <img
                                style={iconColours.colourMode}
                                src={i_cancel}
                                onClick={cancelUpload}
                                alt="cancel-upload"
                            ></img>
                            <h3 style={{ color: colourPalette.secondary }}>
                                {uploadProgress}
                            </h3>
                        </div>
                        <TrackList
                            sortbyName={sortbyName}
                            getSortArrowIconForName={getSortArrowIconForName}
                            sortbyDate={sortbyDate}
                            getSortArrowIconForDate={getSortArrowIconForDate}
                            sortbyTime={sortbyTime}
                            getSortArrowIconForTime={getSortArrowIconForTime}
                            handleTrackPopup={handleTrackPopup}
                            handleMouseEnterBg={handleMouseEnterBg}
                            handleMouseLeaveBg={handleMouseLeaveBg}
                            playButtonVisibilityStyles={playButtonVisibilityStyles}
                            toggleAudioTrack={toggleAudioTrack}
                            toggleLiked={toggleLiked}
                            iconColours={iconColours}
                            colourPalette={colourPalette}
                            styles={styles}
                            selectedPlaylist={selectedPlaylist}
                            selectedTrack={selectedTrack}
                        />
                    </div>
                </div>
                <Queue
                    queueStyleLogic={queueStyleLogic}
                    clearQueue={clearQueue}
                    getCoverFromTrack={getCoverFromTrack}
                    removeFromQueue={removeFromQueue}
                    queue={queue}
                    iconColours={iconColours}
                    colourPalette={colourPalette}
                    styles={styles}
                />
            </div>
        </div>
    );
}

export default App;
