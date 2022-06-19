import { useState, useRef, useEffect } from "react"
import { fileInfo, getFormattedDate } from "../Logic/Utils"

import axios from "axios";


const useModal = (setSelectedPlaylistCover, playlists, setPlaylists, selectedPlaylist, handleImageFile, setPlaylistNameAndDescription, setSelectedPlayist) => {



    const [showingModal, setShowingModal] = useState(false)
    const [modalMode, setModalMode] = useState("EDIT")
    const descRef = useRef(null)
    const nameRef = useRef(null)
    const [createPlaylistCover, setCreatePlaylistCover] = useState("")


    const handleEditDetailsImageFile = (e, file) =>{ 

        let contents = e.target.result;
        const fileExtension = fileInfo(file.name).ext;
        const fileIsAvailable = 
            fileExtension === "jpeg" ||
            fileExtension === "png"  ||
            fileExtension === "jpg"

        if(!fileIsAvailable) return
            

        
        setSelectedPlaylistCover(contents);
    }

    const handleCreatePlaylistImageFile = (e, file) => {
        let contents = e.target.result;
        const fileExtension = fileInfo(file.name).ext;
        const fileIsAvailable = 
            fileExtension === "jpeg" ||
            fileExtension === "png"  ||
            fileExtension === "jpg"

        if(!fileIsAvailable) return
            

        
        setCreatePlaylistCover(contents);
    }

    const modalStyles = {
        display: showingModal ? "flex" : "none"
    }
    

 

    const createPlaylist = () => {
        const newName = nameRef.current.value
        const newDescription = descRef.current.value
       

        const newPlaylist = { 
            name: newName,
            tracks: [],
            id: Date.now(),
            cover: createPlaylistCover,
            date: Date.now(),
            description: newDescription
        }

        const newPlaylists = playlists
        newPlaylists.push(newPlaylist)
        setPlaylists(newPlaylists)
        setSelectedPlayist(newPlaylist)
        hideModal()

        axios.post("http://localhost:3001/playlists", newPlaylists)
        .catch(err => console.error(err))

    }
 

    const getModalCover = () =>{
        if(modalMode === "EDIT")
            return selectedPlaylist.cover
        if(modalMode === "CREATE")
            return createPlaylistCover
    }

    const getModalFileInputFunc = e =>{
        if(modalMode === "EDIT")
            return handleImageFile(e, handleEditDetailsImageFile)
        if(modalMode === "CREATE")
            return handleImageFile(e, handleCreatePlaylistImageFile)
    } 

    const getModalSumbitFunc = () =>{
        if(modalMode === "EDIT")
            return handleEditDetails()
        if(modalMode === "CREATE")
            return createPlaylist()
    } 

    const getModalTitle = () =>{
        if(modalMode === "EDIT")
            return "Edit Details"
        if(modalMode === "CREATE")
            return "Create Playlist"
    } 

    

    



    const handleEditDetails = () => {

        const newName = nameRef.current.value
        const newDesc = descRef.current.value

        
        setPlaylistNameAndDescription(newName, newDesc)


        hideModal()
    }

    useEffect(()=>{
        if(modalMode === "EDIT"){
            nameRef.current.value = selectedPlaylist.name
            descRef.current.value = selectedPlaylist.description
        }
        if(modalMode === "CREATE"){
            nameRef.current.value = ""
            descRef.current.value = ""
        }
    }, [modalMode, selectedPlaylist])


    const handleKeyboardInput = (e) => {
        if (!showingModal) return;
        e.preventDefault();
        e.stopPropagation()
        const ESCAPE = "Escape";
        const ENTER = "Enter"




        

        if (e.key === ESCAPE){
            setShowingModal(false)
        }

        if(e.key === ENTER){
            getModalSumbitFunc()
        }
        
    };

    const handleTextInputs = e => {

        const ESCAPE = "Escape";
        const ENTER = "Enter"
        
        if (e.key === ESCAPE){
            setShowingModal(false)
        }

        if(e.key === ENTER){
            getModalSumbitFunc()
        }
        e.stopPropagation()
    }

    useEffect(()=>{
        nameRef.current.addEventListener("keydown", handleTextInputs)
        descRef.current.addEventListener("keydown", handleTextInputs)
        document.addEventListener("keydown", handleKeyboardInput, false);

        return () => {
            document.removeEventListener("keydown", handleKeyboardInput, false);
            nameRef.current.removeEventListener("keydown", handleTextInputs)
            descRef.current.removeEventListener("keydown", handleTextInputs)
        };
    },[])





    const handleCreatePlaylistModal = () =>{
        setShowingModal(true)
        setModalMode("CREATE")
      }
      
    const handleEditPlaylistModal = () =>{
        const isLikedPlaylist = selectedPlaylist.id === 1
        if(isLikedPlaylist) return

        setShowingModal(true)
        setModalMode("EDIT")
    }
    
    const hideModal = () => {
        setShowingModal(false)
    }
        



    return {showingModal, handleEditDetailsImageFile, handleCreatePlaylistModal, handleEditPlaylistModal, hideModal, modalStyles, getModalCover, getModalFileInputFunc, getModalSumbitFunc, getModalTitle, descRef, nameRef}



}

export default useModal