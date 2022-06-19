import { useState } from "react";

const useQueue = () => {
    

    const [queue, setQueue] = useState([]);
    const [showingQueue, setShowingQueue] = useState(false);


    const addToQueue = (track) => {
        const newQueue = queue;
        newQueue.push(track);

        setQueue(newQueue);
    };

    const dequeue = () => {
        const newQueue = queue;
        newQueue.shift();

        setQueue(newQueue);
    };

    const clearQueue = () => { 
        setQueue([]);
    };

    const removeFromQueue = (i) => {
        const newQueue =  [...queue];
        newQueue.splice(i, 1);

        setQueue(newQueue);
    };

    const toggleShowingQueue = () => {
        setShowingQueue(showingQueue ? false : true)
    }

    const queueStyleLogic = {
        transform: !showingQueue ? "none" : "translate(-300px)",
    };



    return { queue, addToQueue, clearQueue, removeFromQueue, dequeue, toggleShowingQueue, queueStyleLogic };
};

export default useQueue;
