import { useState, useRef } from "react";
import { defaultPlaylist, defaultTrack, likedTracksPlaylist } from "../Logic/Interfaces";

const usePlayback = () => {
    const [selectedTrack, setSelectedTrack] = useState(defaultTrack);
    const selectedTrackRef = useRef(null);
    const [likedTracks, setLikedTracks] = useState(likedTracksPlaylist);
    const [selectedPlaylist, setSelectedPlayist] = useState(defaultPlaylist);
    const [playlists, setPlaylists] = useState([selectedPlaylist]);

    const toggleAudio = () => selectedTrackRef.current.toggleAudio();

    const setPlaying = (bool) => {
        setSelectedTrack({
            name: selectedTrack.name,
            id: selectedTrack.id,
            date: selectedTrack.date,
            playlist: selectedTrack.playlist,
            playing: bool,
            liked: selectedTrack.liked,
            length: selectedTrack.length,
            size: selectedTrack.size_mb,
            src: selectedTrack.src,
        });
    };

    const toggleAudioTrack = (track) => {
        const isSelectedTrack = track.id === selectedTrack.id;

        if (isSelectedTrack) {
          
            toggleAudio();
            return;
        }
        setPlaying(false);
        setSelectedTrack(track);
    };

    const startPlaylist = () => toggleAudioTrack(selectedPlaylist.tracks[0]);

    const addToSelectedPlaylist = (tracks) => {
        const newTracks = selectedPlaylist.tracks;
        tracks.forEach((track) => {
            newTracks.push(track);
        });

        const newPlaylist = {
            name: selectedPlaylist.name,
            tracks: newTracks,
            id: selectedPlaylist.id,
            cover: selectedPlaylist.cover,
            date: selectedPlaylist.date,
            description: selectedPlaylist.description,
        };

        setSelectedPlayist(newPlaylist);
    };

    const removeFromSelectedPlaylist = (track) => {
        const newTracklist = selectedPlaylist.tracks;
        const i = selectedPlaylist.tracks.findIndex((c) => {
            if (c.id === track.id) return true;
            return false;
        });
        newTracklist.splice(i, 1);

        const newPlaylist = {
            name: selectedPlaylist.name,
            tracks: newTracklist,
            id: selectedPlaylist.id,
            cover: selectedPlaylist.cover,
            date: selectedPlaylist.date,
            description: selectedPlaylist.description,
        };
        setSelectedPlayist(newPlaylist);
    };

    const removeTracksFromSelectedPlaylist = (tracks) => {
        const newTracklist = selectedPlaylist.tracks;

        tracks.forEach((track) => {
            const i = selectedPlaylist.tracks.findIndex((c) => {
                if (c.id === track.id) return true;
                return false;
            });
            newTracklist.splice(i, 1);
        });

        const newPlaylist = {
            name: selectedPlaylist.name,
            tracks: newTracklist,
            id: selectedPlaylist.id,
            cover: selectedPlaylist.cover,
            date: selectedPlaylist.date,
            description: selectedPlaylist.description,
        };
        setSelectedPlayist(newPlaylist);
    };

    const setSelectedPlaylistTracks = (tracks) => {
        setSelectedPlayist({
            name: selectedPlaylist.name,
            tracks: tracks,
            id: selectedPlaylist.id,
            cover: selectedPlaylist.cover,
            date: selectedPlaylist.date,
            description: selectedPlaylist.description,
        });
    };

    const setSelectedPlaylistCover = (cover) => {
        const newPlaylist = {
            name: selectedPlaylist.name,
            tracks: selectedPlaylist.tracks,
            id: selectedPlaylist.id,
            cover: cover,
            date: selectedPlaylist.date,
            description: selectedPlaylist.description,
        };

        setSelectedPlayist(newPlaylist);
        updatePlaylist(newPlaylist);
    };

    const handleClickOnPlaylist = (playlist) => {
        setSelectedPlayist(playlist);
    };

    const setPlaylistNameAndDescription = (
        name,
        desc,
        cover = selectedPlaylist.cover
    ) => {
        const newPlaylist = {
            name: name,
            tracks: selectedPlaylist.tracks,
            id: selectedPlaylist.id,
            cover: cover,
            date: selectedPlaylist.date,
            description: desc,
        };

        setSelectedPlayist(newPlaylist);
        updatePlaylist(newPlaylist);
    };

    const updatePlaylist = (playlist) => {
        const i = playlists.findIndex((c) => {
            if (c.id === playlist.id) return true;
            return false;
        });
        const newPlaylist = playlists;
        newPlaylist[i] = playlist;

        setPlaylists(newPlaylist);
    };

    const addToPlaylist = (playlist, track) => {
        const newTrack = track;
        newTrack.id = Date.now();

        const newPlaylist = playlist;
        newPlaylist.tracks.push(newTrack);

        const newPlaylists = playlists;
        const i = playlists.findIndex((c) => {
            if (c.id === playlist.id) return true;
            return false;
        });

        newPlaylists[i] = newPlaylist;
        setPlaylists(newPlaylists);
    };

    const toggleLiked = (track) => {
        const isLiked = track.liked;
        let tracks = selectedPlaylist.tracks;
        const i = selectedPlaylist.tracks.findIndex((c) => {
            if (c.id === track.id) return true;
            return false;
        });
        tracks[i].liked = !isLiked;
        setSelectedPlaylistTracks(tracks);

        const newLikedTracks = likedTracks
        let isDuplicate = false
        likedTracks.tracks.forEach(likedTrack => {
            if(likedTrack.id === track.id){
                isDuplicate = true
                return
            }
        })
        console.log(isDuplicate)
        if (tracks[i].liked && !isDuplicate)
            newLikedTracks.tracks.push(tracks[i])
        else
            newLikedTracks.tracks.splice(i, 1)
        
        setLikedTracks(newLikedTracks)


    };

    const showLikedTracks = () => {
        setSelectedPlayist(likedTracks)
    }

    const getCoverFromTrack = (id) => {
        const playlist = playlists.find((c) => c.id === id);
        return playlist.cover;
    };

    return {
        selectedTrack,
        selectedTrackRef,
        setPlaying,
        toggleLiked,
        toggleAudioTrack,
        selectedPlaylist,
        toggleAudio,
        getCoverFromTrack,
        playlists,
        setPlaylists,
        addToPlaylist,
        updatePlaylist,
        setPlaylistNameAndDescription,
        handleClickOnPlaylist,
        setSelectedPlaylistCover,
        setSelectedPlaylistTracks,
        removeTracksFromSelectedPlaylist,
        removeFromSelectedPlaylist,
        addToSelectedPlaylist,
        startPlaylist,
        setSelectedPlayist,
        setSelectedTrack,
        showLikedTracks
    };
};

export default usePlayback;
