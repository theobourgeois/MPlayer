
import React, { memo } from "react"
import "./PlaylistModal.css"

import i_exit from "../../Images/x-symbol.svg"
import i_edit from "../../Images/edit.svg"



const RenamePlaylist = 
    ({colourPalette, 
    styles, 
    iconColours, 
    hideModal,
    modalStyles, 
    getModalCover, 
    getModalFileInputFunc, 
    getModalSumbitFunc, 
    getModalTitle,
    nameRef, 
    descRef
    }) => {
    


    const handlePropagation = e => {
        e.stopPropagation()
    }





    return (
        <div className="modal" style={modalStyles} onClick={hideModal}>
            <div className="rename-playlist-container" style={styles.body} onClick={handlePropagation}>
                <div className="label-and-exit">
                    <h3 style={{color: colourPalette.secondary}}>{getModalTitle()}</h3>
                    <div className="x-symbol-container" style={styles.side} onClick={hideModal}>
                        <img style={iconColours.colourMode} src={i_exit} alt="x-symbol"></img>
                    </div>
                </div>
                <>
                <div className="form-details-and-cover">
                    <div className="cover-container-details">
                        <img src={getModalCover()} alt="cover"></img>
                        <div className="choose-photo">
                            <img className="edit-pencil"  src={i_edit} alt="edit-symbol"></img>
                            <p>Choose Photo</p>
                            <input id="img-file-input" onChange={getModalFileInputFunc} type="file" ></input>
                        </div>
                    </div>
                    <div className="form-details">
                        <label style={{color: colourPalette.secondary}} for="name">Name</label>
                        <input ref={nameRef} id="name" className="name-input" style={{...styles.side,...{color: colourPalette.secondary}}}></input>
                        <label style={{color: colourPalette.secondary}} for="description">Description</label>
                        <textarea ref={descRef} id="description" type="textarea" className="description-input" style={{...styles.side,...{color: colourPalette.secondary}}}></textarea>
                        
                    </div>
                    
                </div>
                <div className="save-btn-container">
                    <button style={{...{color: colourPalette.body},...styles.secondary}} className="save-button" onClick={getModalSumbitFunc}>Save</button>
                </div>
                </>
            </div>
        </div>
    )



}

export default memo(RenamePlaylist)