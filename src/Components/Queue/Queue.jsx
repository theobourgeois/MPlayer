import React from "react";
import i_bin from "../../Images/bin.svg";
import "./Queue.css"

export function Queue({
    queueStyleLogic,
    clearQueue,
    getCoverFromTrack,
    removeFromQueue,
    queue,
    colourPalette,
    styles,
    iconColours,

}) {
    return <div className="queue-container" style={{
        ...styles.side,
        ...queueStyleLogic
    }}>
        <div className="queue-elements">
            <div className="queue-title-clear-button">
                <h3 className="queue-title" style={{
                    color: colourPalette.secondary
                }}>
                    Queue
                </h3>
                <div className="clear-queue-button" style={styles.secondary} onClick={clearQueue}>
                    Clear
                </div>
            </div>
        </div>
        <div className="divider-1" style={styles.sideDivider}></div>
        {queue.map((c, i) => <>
            <div className="queue-card">
                <img src={getCoverFromTrack(c.playlist)} className="queue-cover" alt="queue-cover"></img>
                <h3 style={{
                    color: colourPalette.secondary
                }}>
                    {c.name}
                </h3>
                <img src={i_bin} style={iconColours.colourMode} className="queue-bin" onClick={() => removeFromQueue(i)} alt="bin"></img>
            </div>
        </>)}
    </div>;
}
