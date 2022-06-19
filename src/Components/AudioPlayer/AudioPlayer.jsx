
import {useRef, useEffect, forwardRef, useImperativeHandle, memo, useState, useCallback} from "react"
import React from 'react';
import useAudioPlayer from "../../Hooks/useAudioPlayer"
import WaveSurfer from "wavesurfer.js";
import "./AudioPlayer.css"



const AudioPlayer = forwardRef(({
  i_threeDots,
  styles,
  iconColours,
  colourPalette,
  track,
  setPlaying,
  volume,
  nextTrack,
  getCoverFromTrack,
  handleTrackPopup
}, ref) => {
   
    const { 
        wavesurferRef,
        wavesurfer,
        progressRef,
        currentTime,
        trackLength,
        hoverTimePosStyle,
        isHoveringOnProgressStyle,
        hoverTime,
        calcSliderPos,
        setIsHoveringOnProgress,
        handleProgressChange,
        isReady,
        audioPlayerRef
      } = useAudioPlayer(track, volume, setPlaying, nextTrack, colourPalette,  )



    useImperativeHandle(ref, ()=>({
        play() {
            if(!isReady) return
            wavesurfer.play()
            setPlaying(true)
        },
        pause(){
            if(!isReady) return
            wavesurfer.pause()
            setPlaying(false)
        },
        toggleAudio(){
            if(!isReady) return
            wavesurfer.playPause()
            setPlaying(wavesurfer.isPlaying())
        },
        playFromStart(){
            if(!isReady) return
            wavesurfer.seekTo(0)
            wavesurfer.play()
            setPlaying(true)
        },
        restart(){
            if(!isReady) return
            wavesurfer.seekTo(0)
        },
        skipTo(dest){
            if(!isReady) return
            wavesurfer.seekTo(dest)
        },
        getDuration(){
            if(!isReady) return
            return wavesurfer.getDuration()
        },
        toggleMute(){
            if(!isReady) return
            wavesurfer.toggleMute()
        },
        getMute(){
            if(!isReady) return
            return wavesurfer.getMute()
        },
        playing(){
            if(!isReady) return
            return wavesurfer.isPlaying()
        },
        setVolume(volume){
            if(!isReady) return
            wavesurfer.setVolume(volume)
        }




    }))




    
  return (
  
    <div className="audio-player" style={styles.body}>
        <div className="cover-template" >
            <img src={getCoverFromTrack(track.playlist)} alt="music-note" ></img>
        </div>
        <div className="progress-bar-and-title-container">
            <div className="progress-bar-and-title">
                <div className="title-and-dots" style={iconColours.colourMode} onClick={(e) => handleTrackPopup(track, e)}>
                    <h3 className="song-title" style={{color: colourPalette.secondary}}>{track.name}</h3>
                    <img className="three-dots-title" src={i_threeDots} alt="three-dots-title"  style={iconColours.colourMode}></img>
                </div>
                <div className="waveform" ref={wavesurferRef} >
                </div>
                <div className="hover-time" style={{...hoverTimePosStyle,...isHoveringOnProgressStyle}}>
                    <p>{hoverTime}</p>
                </div>
                <div className="time-and-progress-bar" ref={audioPlayerRef} >
                    <p style={{color: colourPalette.secondary}}>{currentTime}</p>
                    <div className="progress-bar" >
                        <input ref={progressRef} onMouseMove={calcSliderPos} onMouseOut={()=>setIsHoveringOnProgress(false)} className="progress-slider" type="range" max="1" min="0" step="0.001" onChange={handleProgressChange}></input>
                    </div>
                    <p style={{color: colourPalette.secondary}}>{trackLength}</p>
                </div>
            </div>
        </div>
    </div>
    )

})

export default memo(AudioPlayer)
  