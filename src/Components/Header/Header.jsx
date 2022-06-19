import React from "react";
import AudioPlayer from "./../AudioPlayer/AudioPlayer";
import "./Header.css";
import { useEffect } from "react";
import useVolume from "../../Hooks/useVolume";

import i_logo from "../../Images/logo.svg";
import i_shuffle from "../../Images/shuffle.svg";
import i_loop from "../../Images/loop.svg";
import i_queue from "../../Images/queue.svg";
import i_darkMode from "../../Images/darkmode.svg";
import i_lightMode from "../../Images/lightmode.svg";
import i_fastForward from "../../Images/fastforward.svg";
import i_play_1 from "../../Images/play_1.svg";
import i_pause_1 from "../../Images/pause_1.svg";

import i_musicNote from "../../Images/musicnote.svg";
import i_threeDots from "../../Images/threedots.svg";
import usePlaybackControls from "../../Hooks/usePlaybackControls";

export function Header({
    toggleAudio,
    selectedTrack,
    styles,
    iconColours,
    colourPalette,
    selectedTrackRef,
    setPlaying,
    toggleShowingQueue,
    toggleDarkMode,
    selectedPlaylist,
    startPlaylist,
    toggleAudioTrack,
    queue,
    dequeue,
    getCoverFromTrack,
    showingModal,
    handleTrackPopup,
}) {
    const { volume, volumeRef, toggleMute, handleVolumeChange, getVolumeIcon } =
        useVolume(selectedTrackRef, colourPalette);

    const {
        toggleShuffleIcon,
        toggleLoopIcon,
        nextTrack,
        prevTrack,
        toggleShuffleIconStyles,
        toggleLoopIconStyles,
    } = usePlaybackControls(
        toggleAudioTrack,
        selectedPlaylist,
        selectedTrack,
        queue,
        iconColours,
        dequeue,
        startPlaylist,
        selectedTrackRef
    );

    // const handleKeyboardPause = (e) => {
    //     if (showingModal) return;

    //     const SPACE = " ";
    //     if (e.key === SPACE) {
    //         e.preventDefault();
    //         toggleAudio();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeyboardPause, false);

    //     return () => {
    //         document.removeEventListener("keydown", handleKeyboardPause, false);
    //     };
    // }, [showingModal]);

    return (
        <header className="header-container" style={styles.side}>
            <div className="logo-container">
                <img className="logo" src={i_logo} alt="logo"></img>
            </div>
            <div className="header-items">
                <div className="playback-controls">
                    <img
                        className="shuffle"
                        src={i_shuffle}
                        alt="shuffle"
                        style={toggleShuffleIconStyles}
                        onClick={toggleShuffleIcon}
                    ></img>

                    <img
                        className="rewind"
                        src={i_fastForward}
                        alt="rewind"
                        style={iconColours.colourMode}
                        onClick={prevTrack}
                    ></img>

                    <img
                        className="play-pause-main"
                        src={selectedTrack.playing ? i_pause_1 : i_play_1}
                        alt="play-pause"
                        style={iconColours.colourMode}
                        onClick={toggleAudio}
                    ></img>

                    <img
                        className="fastfoward"
                        src={i_fastForward}
                        alt="fastforward"
                        onClick={nextTrack}
                        style={iconColours.colourMode}
                    ></img>

                    <img
                        className="loop"
                        src={i_loop}
                        alt="loop"
                        style={toggleLoopIconStyles}
                        onClick={toggleLoopIcon}
                    ></img>
                </div>

                <AudioPlayer
                    handleTrackPopup={handleTrackPopup}
                    track={selectedTrack}
                    i_musicNote={i_musicNote}
                    i_threeDots={i_threeDots}
                    volume={volume}
                    styles={styles}
                    iconColours={iconColours}
                    colourPalette={colourPalette}
                    ref={selectedTrackRef}
                    setPlaying={setPlaying}
                    nextTrack={nextTrack}
                    getCoverFromTrack={getCoverFromTrack}
                />

                <div className="volume-slider-container">
                    <img
                        className="volume-icon"
                        src={getVolumeIcon()}
                        alt="volume-icon"
                        style={iconColours.colourMode}
                        onClick={toggleMute}
                    ></img>
                    <input
                        ref={volumeRef}
                        className="volume-slider"
                        type="range"
                        max="1"
                        min="0"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    ></input>
                </div>

                <div className="queue-and-darkmode">
                    <img
                        className="queue-icon"
                        src={i_queue}
                        alt="queue"
                        style={iconColours.colourMode}
                        onClick={toggleShowingQueue}
                    ></img>
                    <img
                        className="darkmode-toggle"
                        onClick={toggleDarkMode}
                        src={colourPalette.darkMode ? i_lightMode : i_darkMode}
                        alt="darkmode-toggle"
                    ></img>
                </div>
            </div>
        </header>
    );
}
