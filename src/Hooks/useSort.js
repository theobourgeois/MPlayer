import { useState } from "react";

const useSort = (setSelectedPlaylistTracks, selectedPlaylist) => {

    const [sortedByDate, setSortedByDate] = useState(true);
    const [sortedByName, setSortedByName] = useState(true);
    const [sortedByTime, setSortedByTime] = useState(true);
    const [currentSorting, setCurrentSorting] = useState("DATE");

    const sortbyDate = () => {
        const sortedPlaylist = selectedPlaylist;
        sortedPlaylist.tracks.sort((a, b) => (a.id > b.id ? 1 : -1));

        setSortedByDate(!sortedByDate);
        setCurrentSorting("DATE");

        if (sortedByDate) {
            setSelectedPlaylistTracks(sortedPlaylist.tracks.reverse());
            return;
        }
        setSelectedPlaylistTracks(sortedPlaylist.tracks);
    };

    const sortbyName = () => {
        const sortedPlaylist = selectedPlaylist;
        sortedPlaylist.tracks.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );

        setCurrentSorting("NAME");
        setSortedByName(!sortedByName);

        if (sortedByName) {
            setSelectedPlaylistTracks(sortedPlaylist.tracks.reverse());
            return;
        }

        setSelectedPlaylistTracks(sortedPlaylist.tracks);
    };

    const sortbyTime = () => {
        const sortedPlaylist = selectedPlaylist;
        sortedPlaylist.tracks.sort((a, b) =>
            a.length > b.length ? 1 : -1
        );

        setCurrentSorting("TIME");
        setSortedByTime(!sortedByTime);

        if (sortedByTime) {
            setSelectedPlaylistTracks(sortedPlaylist.tracks.reverse());
            return;
        }

        setSelectedPlaylistTracks(sortedPlaylist.tracks);
    };

    const getSortArrowIconForDate = () => {
        if (currentSorting === "DATE") return sortedByDate ? "▼" : "▲";

        return " ";
    };

    const getSortArrowIconForTime = () => {
        if (currentSorting === "TIME") return sortedByTime ? "▼" : "▲";

        return " ";
    };

    const getSortArrowIconForName = () => {
        if (currentSorting === "NAME") return sortedByName ? "▼" : "▲";

        return " ";
    };



    
    return { sortbyDate, sortbyName, sortbyTime, getSortArrowIconForDate, getSortArrowIconForName, getSortArrowIconForTime, currentSorting };
};

export default useSort;
