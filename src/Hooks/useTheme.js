import { useEffect, useState } from "react";
import { darkMode, lightMode } from "../Logic/Themes";

const useTheme = () => {
    const [colourPalette, setColourPalette] = useState(darkMode);

    const toggleDarkMode = () =>
        setColourPalette(colourPalette.darkMode ? lightMode : darkMode);

    const iconColours = {
        colourMode: {
            filter: colourPalette.darkMode
                ? "invert(0) sepia(9%) saturate(157%) hue-rotate(200deg) brightness(100%) contrast(84%)"
                : "brightness(0) saturate(100%) invert(17%) sepia(8%) saturate(805%) hue-rotate(158deg) brightness(100%) contrast(86%)",
        },
        notColourMode: {
            filter: colourPalette.darkMode
                ? "brightness(0) saturate(100%) invert(17%) sepia(8%) saturate(805%) hue-rotate(158deg) brightness(100%) contrast(86%)"
                : "invert(100%) sepia(5%) saturate(157%) hue-rotate(200deg) brightness(100%) contrast(84%)",
        },
        other: {
            filter: colourPalette.darkMode
                ? "invert(22%) sepia(20%) saturate(748%) hue-rotate(150deg) brightness(104%) contrast(85%)"
                : "invert(89%) sepia(8%) saturate(120%) hue-rotate(193deg) brightness(95%) contrast(82%)",
        },
        white: {
            filter: "brightness(300%)",
        },

        accent: {
            filter: "invert(61%) sepia(94%) saturate(252%) hue-rotate(161deg) brightness(96%) contrast(92%)",
        },
    };

    const styles = {
        body: {
            backgroundColor: colourPalette.body,
        },
        side: {
            backgroundColor: colourPalette.side,
        },
        secondary: {
            backgroundColor: colourPalette.secondary,
        },
        other: {
            backgroundColor: colourPalette.other,
        },
        accent: {
            backgroundColor: colourPalette.accent,
        },
        popupBody: {
            backgroundColor: colourPalette.popupBody,
        },
        sideDivider: {
            backgroundColor: colourPalette.sideDivider,

        }
    };

    useEffect(()=>{
        document.body.style.backgroundColor = colourPalette.side
    }, [colourPalette])

    return { colourPalette, styles, toggleDarkMode, iconColours };
};

export default useTheme;
