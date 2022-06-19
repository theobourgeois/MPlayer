import { useState, useEffect } from "react";

const playbackStates = {
    shuffle: "shuffle",
    loop: "loop",
    none: "none",
};

const usePlaybackControls = (toggleAudioTrack, selectedPlaylist, selectedTrack, queue, iconColours, dequeue, startPlaylist, selectedTrackRef) => {

    const [playbackState, setPlaybackState] = useState(
        localStorage.getItem("playbackState")
    );
    const [shuffledTracks, setShuffledTracks] = useState([])

    const shuffleTracks = () => {

        const newShuffledTracks = [...selectedPlaylist.tracks]
        let currentIndex = newShuffledTracks.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = newShuffledTracks[currentIndex];
            newShuffledTracks[currentIndex] = newShuffledTracks[randomIndex];
            newShuffledTracks[randomIndex] = temporaryValue;
        }
        setShuffledTracks(newShuffledTracks)

        



    }  


    useEffect(()=>{
        shuffleTracks()
        console.log("CHANEGD")
    }, [selectedPlaylist])

    
        
     


    const handleShuffle = () => {

        const i = shuffledTracks.findIndex((track) => {
            if (track.id === selectedTrack.id) 
                return true;
            return false
        });
        console.log(i+1)
        let nextTrack = shuffledTracks[i+1]
        if(i+2 >= shuffledTracks.length)
            nextTrack = shuffledTracks[0];
        
       
        toggleAudioTrack(nextTrack);
    };

    useEffect(() => {
        localStorage.setItem("playbackState", playbackState);
    }, [playbackState]);


    const toggleShuffleIcon = () => {
        setPlaybackState(
            playbackState !== playbackStates.shuffle
                ? playbackStates.shuffle
                : playbackStates.none
        )
    } 

    const toggleLoopIcon = () => {
        setPlaybackState(
            playbackState !== playbackStates.loop
                ? playbackStates.loop
                : playbackStates.none
        )
    }

    const toggleShuffleIconStyles = 
        playbackState === playbackStates.shuffle ? 
            iconColours.accent : iconColours.colourMode

    const toggleLoopIconStyles = 
        playbackState === playbackStates.loop ? 
            iconColours.accent : iconColours.colourMode




    const handleQueue = () => {
        const nextTrack = queue[0];
        toggleAudioTrack(nextTrack);
        dequeue();
    };

    const nextTrack = () => {
        const hasQueue = queue.length > 0;
        if (hasQueue) {
            handleQueue();
            return;
        }
        switch (playbackState) {
            case playbackStates.none:
                handleNoPlaybackState();
                break;
            case playbackStates.loop:
                handleLoop();
                break;
            case playbackStates.shuffle:
                handleShuffle();
                break;
            default:
                break
        }
    };

    const handleNoPlaybackState = () => {
        const i = selectedPlaylist.tracks.findIndex((track) => {
            if (track.id === selectedTrack.id) 
                return true;
            return false
        });
        const isLastTrack = i === selectedPlaylist.tracks.length - 1;
        const isOnlyTrack = selectedPlaylist.tracks.length === 1;

        if (isLastTrack) {
            startPlaylist();
        } else if (isOnlyTrack) {
            handleLoop();
        } else {
            toggleAudioTrack(selectedPlaylist.tracks[i + 1]);
        }
    };
    
    const prevTrack = () => {

        if(playbackState === playbackStates.shuffle){
            const i = shuffledTracks.findIndex((track) => {
                if (track.id === selectedTrack.id) 
                    return true;
                return false
            });
            
            let nextTrack = shuffledTracks[i-1]
            if(i-1 < 0)
                nextTrack = shuffledTracks[shuffledTracks.length-1];
            
           
            toggleAudioTrack(nextTrack);
            return


        }

        const i = selectedPlaylist.tracks.findIndex((track) => {
            if (track.id === selectedTrack.id) 
                return true;
            return false
        });
        const hasPassedTime = false; //TODO: get time
        const isFirstTrack = i === 0;

        if (hasPassedTime) {
            handleLoop();
            return;
        }

        if (isFirstTrack)
            toggleAudioTrack(
                selectedPlaylist.tracks[selectedPlaylist.tracks.length - 1]
            );
        else toggleAudioTrack(selectedPlaylist.tracks[i - 1]);
    };
    const handleLoop = () => {
        selectedTrackRef.current.playFromStart();
    };





    return { toggleShuffleIcon, toggleLoopIcon, nextTrack, prevTrack, toggleShuffleIconStyles, toggleLoopIconStyles};
};

export default usePlaybackControls;
