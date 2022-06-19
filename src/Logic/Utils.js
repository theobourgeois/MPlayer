function fileInfo(file) {
    let dotindex = 0;

    for (let i = file.length; i > 0; i--) {
        if (file[i] === ".") {
            dotindex = i;
            continue;
        }
    }

    return {
        name: file.substr(0, dotindex),
        ext: file.substr(dotindex + 1),
    };
}

const getFormattedDate = () => {
    const date = new Date();

    const monthIndex = date.getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = months[monthIndex];
    let hour = date.getHours() % 12;
    console.log(date.getHours());
    if (date.getHours() === 12 || date.getHours() === 0) hour = 12;

    const day = date.getDate();
    const year = date.getFullYear();
    const time = `${hour}:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`;

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) daySuffix = "st";
    if (day === 3 || day === 23) daySuffix = "rd";
    if (day === 2 || day === 22) daySuffix = "nd";

    let timeSuffix = "am";

    if (date.getHours() >= 12) timeSuffix = "pm";

    return `${month} ${day}${daySuffix} ${year}, ${time}${timeSuffix}`;
};

const formatFileSizeFromTracks = (tracks) => {
    let bytes = 0;
    tracks.forEach(track=>{
      bytes+=track.size
    })

    

    const sizeMegaBytes = (bytes / Math.pow(10, 6)).toFixed(2) + "mb";
    return sizeMegaBytes;
};

const formatFileSize = (bytes) => {

    const sizeMegaBytes = (bytes / Math.pow(10, 6)).toFixed(2) + "mb";
    return sizeMegaBytes;
};



function ellipsize(name, thresh = 24) {
    return name.length > thresh ? name.substr(0, thresh) + "..." : name;
}

function getFormattedTime(time) {
    if(time === Infinity)
        return "0:00"
        
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

const calculatePlaylistLength = (playlist) => {
    if (!playlist.tracks) return;

    let totalTime = 0;

    playlist.tracks.forEach((track) => {
        totalTime += track.length;
    });
    const totalMinutes = Math.floor(totalTime / 60);

    return totalMinutes;
};



export {
    fileInfo,
    getFormattedDate,
    formatFileSize,
    ellipsize,
    getFormattedTime,
    calculatePlaylistLength,
    formatFileSizeFromTracks
};
