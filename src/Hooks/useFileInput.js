import { useState } from "react";
import { fileInfo, getFormattedDate, formatFileSize } from "../Logic/Utils";


const useFileInput = (setSelectedPlaylistCover, addToSelectedPlaylist, selectedPlaylist) => {

    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState("0 - 0")
 
    const cancelUpload = () => {
        setIsUploading(false)
    }


    const handleImageFile = (e, callback) => {
        e.stopPropagation()
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader();

  
        reader.onload = (e) => {
            callback(e, file)
        };
        reader.readAsDataURL(file);
    }


    const handleAudioFile = (e) => {


        let files = e.target.files;
        if (!files) {
            return;
        }
        setIsUploading(true)


        
        let availableFiles = []
        //reduce selected files to ones with "wav" & "mp3" extension
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if(
                fileInfo(file.name).ext === "wav" ||
                fileInfo(file.name).ext === "mp3"
            ){
                availableFiles.push(file)
            }

        }


        let tracks = [];
        let size = 0
        for (let i = 0; i < availableFiles.length; i++) {
            const audio = document.createElement('audio');
            let reader = new FileReader();
            let file = availableFiles[i];


            reader.onload = (e) => {
                audio.src = e.target.result

                const loadMetaData = () => {
                    const duration = audio.duration
                    const track = {
                        name: fileInfo(file.name).name,
                        id: Date.now(),
                        date: getFormattedDate(),
                        playlist: selectedPlaylist.id,
                        playing: false,
                        liked: false,
                        length: duration,
                        size: file.size,
                        src: audio.src,
                    };
    
                    tracks.push(track);
                    const doneUploading = tracks.length === availableFiles.length
                    
                    
                    if (doneUploading) {
                        addToSelectedPlaylist(tracks);
                        setIsUploading(false)

                    }
                    size += track.size

                    setUploadProgress(`Uploading ${tracks.length} - ${availableFiles.length} tracks (${formatFileSize(size)}) `)

                }

                audio.addEventListener('loadedmetadata', loadMetaData, false)
                return () => audio.removeEventListener('loadedmetadata', loadMetaData, false)
                


               

            };
           
            

            reader.readAsDataURL(file);
        }
    }

    const uploadingVisibilityStyle = {
        opacity: isUploading ? "100" : "0"
        
    }


    
    return {handleImageFile, handleAudioFile, uploadingVisibilityStyle, uploadProgress, cancelUpload};
};

export default useFileInput
