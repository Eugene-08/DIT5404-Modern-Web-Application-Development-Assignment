import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: "#f78528",
            main: "#f76d21",
            dark: "#f77d19",
            contrastText: "white",
        },
    },
    typography: {
        fontFamily: [
            "Noto Sans HK",
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});
