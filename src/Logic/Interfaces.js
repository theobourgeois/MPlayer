import i_default_cover from "../Images/windmountains.png";
import i_liked_cover from "../Images/liked-tracks-cover.png"

export const defaultTrack = {
    name: "Default Track",
    id: 0,
    date: "September 2nd 2002, 10:30pm",
    playlist: 0,
    playing: false,
    liked: false,
    length: 20,
    size: 22,
    src: "https://www.computerhope.com/jargon/m/example.mp3",
};

export const defaultPlaylist = {
    name: "Default Playlist",
    tracks: [defaultTrack],
    id: 0,
    cover: i_default_cover,
    date: 214134,
    description: "description",
};

export const likedTracksPlaylist = {
    name: "Liked Tracks",
    tracks: [],
    id: 1,
    cover: i_liked_cover,
    date: "",
    description: "Your liked tracks",  
}

export default { defaultPlaylist, defaultTrack, likedTracksPlaylist };
