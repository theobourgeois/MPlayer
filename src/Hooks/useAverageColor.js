import FastAverageColor from 'fast-average-color';
import { useEffect, useState } from "react"

export const useAverageColor = ( cover, colourPalette ) => {
    const fastAverageColor = new FastAverageColor();
    const [avgColor, setAvgColor] = useState("none")

    useEffect(()=>{
        fastAverageColor.getColorAsync(cover)
        .then(color => {
            const r = color.value[0]
            const g = color.value[1]
            const b = color.value[2]
            setAvgColor(`rgba(${r}, ${g}, ${b}, 0.8)`)

        })
        .catch(err=>{
            console.log(err)
        })
    
    },[cover])

    const avgColorStyles = {
        background: colourPalette.body,
        background: `linear-gradient(180deg, ${avgColor} 1%, ${colourPalette.body} 50vh)`
    }

  
    return { avgColor, avgColorStyles }
    


}

export default useAverageColor