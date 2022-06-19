import { useState } from "react"



const usePopup = () => {

    const [popupTrack, setPopupTrack] = useState({})
    const [popupShowing, setPopupShowing] = useState(false)
    const [popupType, setPopupType] = useState("TRACK")
    const [popupPostionStyle, setPopupPostionStyle] = useState({
      left: 0,
      top: 0
    })

    const handleTrackPopup = (track, e) => {
      e.stopPropagation();
      e.preventDefault()
      const xPos = e.pageX
      const yPos = e.pageY
      setPopupPostionStyle({
        left: xPos,
        top: yPos
      })
      setPopupType("TRACK")
  
  
      if(track.id !== popupTrack.id)
        setPopupTrack(track)
  
      setPopupShowing(popupShowing ? false : true)
  
    }
  
    const handlePlaylistPopup = e => {
      e.stopPropagation();
      e.preventDefault()
      const xPos = e.pageX
      const yPos = e.pageY
  
      setPopupPostionStyle({
        left: xPos,
        top: yPos
      })
      setPopupType("PLAYLIST")
  
  
      setPopupShowing(popupShowing ? false : true)
  
    }

    const handleBodyClick = () => {
      setPopupShowing(false);
    };



    return { popupTrack, setPopupTrack, 
      popupShowing, setPopupShowing,
      popupType, setPopupType, handleBodyClick, 
      popupPostionStyle, handleTrackPopup, handlePlaylistPopup}

}

export default usePopup
