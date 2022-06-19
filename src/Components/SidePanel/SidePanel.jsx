import React, {useMemo} from "react";
import i_heart from "../../Images/heart.svg";
import i_plus from "../../Images/plus.svg";
import i_threeDots from "../../Images/threedots.svg";
import i_logo from "../../Images/logo.svg";
import i_lightmode_logo from "../../Images/lightmode-logo.svg";
import i_darkmode_logo from "../../Images/darkmode-logo.svg";


import { ellipsize } from "../../Logic/Utils";


export function SidePanel({
    handleMouseEnterBg,
    handleMouseLeaveBg,
    handleCreatePlaylistModal,
    handleClickOnPlaylist,
    handlePlaylistPopup,
    iconColours,
    colourPalette,
    styles,
    playlists,
    avgColor,
    showLikedTracks
}) {


    const sideStyles = {
        background: colourPalette.side,
    }
    const getLogo = useMemo(() => {
        return colourPalette.darkMode ? i_darkmode_logo : i_lightmode_logo
    }, [colourPalette])

    return <aside className="side-panel" style={sideStyles}>
        <div className="logo-container">
            <img className="logo" src={getLogo} alt="logo"></img>
        </div>
        <div className="side-panel-items">


            <div className="create-playlist" onMouseEnter={e => handleMouseEnterBg(e, "sideDivider")} onMouseLeave={handleMouseLeaveBg} onClick={handleCreatePlaylistModal} style={{
                transition: "300ms"
            }}>
                <div className="box" style={styles.secondary}>
                    <img className="plus" src={i_plus} alt="plus" style={iconColours.notColourMode}></img>
                </div>
                <h3 style={{
                    color: colourPalette.secondary
                }}>
                    Create Playlist
                </h3>
            </div>

            <div className="liked-tracks-button" onMouseEnter={e => handleMouseEnterBg(e, "sideDivider")} onMouseLeave={handleMouseLeaveBg} onClick={showLikedTracks}
                style={{
                    transition: "300ms"
                }}>
                <div className="box" style={styles.secondary}>
                    <img className="liked-tracks-heart" src={i_heart} alt="heart" style={iconColours.accent}></img>
                </div>
                <h3 style={{
                    color: colourPalette.secondary
                }}>
                    Liked Tracks
                </h3>
            </div>
            <div className="divider-1" style={styles.sideDivider}></div>
            <h3 style={{
                color: colourPalette.secondary
            }}>
                PLAYLISTS
            </h3>
            <div className="playlist-list">
                {playlists.map(playlist => <>
                    <div className="playlist-card" onMouseEnter={e => handleMouseEnterBg(e, "sideDivider")} onMouseLeave={handleMouseLeaveBg} onClick={() => handleClickOnPlaylist(playlist)}>
                        <div className="cover-and-title-playlist">
                            <img className="playlist-cover" src={playlist.cover} alt="playlist-cover"></img>
                            <h3 className="playlist-title" style={{
                                color: colourPalette.secondary
                            }} title={playlist.name}>
                                {ellipsize(playlist.name)}
                            </h3>
                        </div>

                        <img className="playlist-menu-dots" src={i_threeDots} alt="playlist-menu-dots" style={iconColours.colourMode} onClick={handlePlaylistPopup}></img>
                    </div>
                </>)}
            </div>
        </div>
    </aside>;
}
