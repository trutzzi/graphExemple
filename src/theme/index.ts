import { createTheme } from "@mui/material";
import { blueGrey, blue } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: blue,
        secondary: blueGrey
    },
});

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}