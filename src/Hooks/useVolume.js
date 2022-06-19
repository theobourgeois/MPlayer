import { useState, useEffect, useRef } from "react";

import i_volume_full from "../Images/volume-full.svg";
import i_volume_half from "../Images/volume-half.svg";
import i_volume_mute from "../Images/volume-mute.svg";

const useVolume = (selectedTrackRef, colourPalette) => {
    
    const [volume, setVolume] = useState(localStorage.getItem("volume"));
    const [volumeCache, setVolumeCache] = useState(volume);
    const [muted, setMuted] = useState(false);

    const volumeRef = useRef(null);
    
    useEffect(() => {
        selectedTrackRef.current.setVolume(volume);
        if (volume > 0 && muted) {
          setMuted(false);
          selectedTrackRef.current.toggleMute();
        }
        volumeRef.current.style.backgroundImage = `-webkit-linear-gradient(left, ${colourPalette.accent} ${volume * 100}%, white ${0}%)`;
        localStorage.setItem("volume", volume);
    }, [volume]);

    const handleVolumeChange = (e) => setVolume(e.target.value);


    const toggleMute = () => {
        setVolumeCache(volume);
        selectedTrackRef.current.toggleMute();
        setMuted(selectedTrackRef.current.getMute());
    
        if (!muted) setVolume(0);
        if (muted) setVolume(volumeCache);
    };
    
    const getVolumeIcon = () => {
        if (muted || volume === 0) return i_volume_mute;
        if (volume > 0.5) return i_volume_full;

        return i_volume_half;
    };



    
    return { volume, volumeRef, toggleMute, handleVolumeChange, getVolumeIcon };
};

export default useVolume;
