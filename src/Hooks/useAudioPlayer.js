



import { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from "wavesurfer.js";

const formatTime = currentTime => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - minutes * 60);

    if (seconds < 10) 
        return `${minutes}:0${seconds}`

    return `${minutes}:${seconds}`
    
}



export const useAudioPlayer = (track, volume, setPlaying, nextTrack, colourPalette) => {

    const wavesurferRef = useRef(null)
    const [wavesurfer, setWavesurfer] = useState();
    const [progress, setProgress] = useState(0)
    const progressRef = useRef(null)
    const [currentTime, setCurrentTime] = useState("0:00")
    const [trackLength, setTrackLength] = useState("0:00")
    const [isHoveringOnProgress, setIsHoveringOnProgress] = useState(false)
    const [hoverTimePosStyle, setHoverTimePosStyle] = useState({left: 0})
    const [hoverTime, setHoverTime] = useState(0)
    const isReady = wavesurfer !== undefined
    const audioPlayerRef = useRef(null)


    useEffect(()=>{
        if(wavesurferRef.current){
            const wavesurferOBJ = WaveSurfer.create({
                container: wavesurferRef.current,
                backend: 'MediaElement',
                xhr: {mode: "no-cors"}
        
            })
            
            wavesurferOBJ.load(track.src)
            wavesurferOBJ.setVolume(volume)
            wavesurferOBJ.seekTo(progress)
            progressRef.current.value = 0
            wavesurferOBJ.play()
            setPlaying(true)
            
            setWavesurfer(wavesurferOBJ)
            
            wavesurferOBJ.on('finish', ()=>{
                nextTrack()
            })
            
          
            wavesurferOBJ.on('ready', ()=>{
                setTrackLength(formatTime(wavesurferOBJ.getDuration()))
            })
                
            wavesurferOBJ.on('audioprocess', ()=>{
                setCurrentTime(formatTime(wavesurferOBJ.getCurrentTime()))
                const currentTimeRatio = wavesurferOBJ.getCurrentTime() / wavesurferOBJ.getDuration()
                progressRef.current.value = currentTimeRatio
                progressRef.current.style.backgroundImage = `-webkit-linear-gradient(left, ${colourPalette.accent} ${currentTimeRatio * 100}%, white ${0}%)`
            })


          
    

    
        
           
            return () => wavesurferOBJ.destroy()

          

        }

        
        
    }, [track.id])

   


    useEffect(()=>{
        if(!isReady) return
        wavesurfer.seekTo(progress)
        progressRef.current.style.backgroundImage = `-webkit-linear-gradient(left, ${colourPalette.accent} ${progress * 100}%, white ${0}%)`
        setCurrentTime(formatTime(wavesurfer.getCurrentTime()))
    }, [progress])


    const calcSliderPos = useCallback(e => {
        if(!isReady)
            return  
        setIsHoveringOnProgress(true)

       
        const containerWidth = e.target.clientWidth
        const containerOffsetX = e.nativeEvent.offsetX

        const isInput = e.target.tagName === "INPUT"
        if(!isInput) 
            return
        const hoverRatio = (containerOffsetX / containerWidth) *  parseInt(e.target.getAttribute('max'),10)
        setHoverTime(formatTime(wavesurfer.getDuration()*hoverRatio))
        setHoverTimePosStyle({left: containerOffsetX + (containerWidth/7)})
        
       
    })
    useEffect(()=>{

        progressRef.current.addEventListener('mouseover', calcSliderPos)
        progressRef.current.addEventListener('mouseover', calcSliderPos)
     

        return () =>{
            progressRef.current.removeEventListener('mouseover', calcSliderPos)
        }
    },[])
 

    const handleProgressChange = e => setProgress(parseFloat(e.target.value))
    const isHoveringOnProgressStyle = {
        opacity: isHoveringOnProgress ? "100" : "0",
    }
  



    return { 
        wavesurferRef,
        wavesurfer,
        progress,
        progressRef,
        currentTime,
        trackLength,
        isHoveringOnProgress,
        hoverTimePosStyle,
        isHoveringOnProgressStyle,
        hoverTime,
        calcSliderPos,
        setIsHoveringOnProgress,
        handleProgressChange,
        isReady,
        audioPlayerRef
    }

}

export default useAudioPlayer;