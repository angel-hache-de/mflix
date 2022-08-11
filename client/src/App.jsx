import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#272727",
      paper: "#424242",
      navbar: "#1b1a1a",
      fullMovie: "#1b1a1a",
      alert: "#1b1a1a",
    },
    primary: {
      main: "#D6D6D6",
      contrastText: "#D6D6D6",
    },
    secondary: {
      main: "#D6D6D6",
    },
    buttons: {
      main: "#495057",
      contrastText: "#ffffff",
    },
    icons: {
      main: "#f4f3ee",
    },
    text: {
      primary: "#D6D6D6",
      secondary: "#D6D6D6",
      header: "#10a802",
    },
    imdb: {
      main: "#0c8001",
      contrastText: "#D6D6D6",
    },
    runtime: {
      main: "#750180",
      contrastText: "#D6D6D6",
    },
  },
  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       "& label.Mui-focused": {
    //         color: "green",
    //       },
    //       "& .MuiInput-underline:after": {
    //         borderBottomColor: "green",
    //       },
    //       "& .MuiOutlinedInput-root": {
    //         "& fieldset": {
    //           borderColor: "red",
    //         },
    //         "&:hover fieldset": {
    //           borderColor: "yellow",
    //         },
    //         "&.Mui-focused fieldset": {
    //           borderColor: "green",
    //         },
    //       },
    //     },
    //   },
    // },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       color: "#D6D6D6",
    //     },
    //   },
    // },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#D6D6D6",
          },
          "& .MuiSvgIcon-root": {
            color: "#D6D6D6",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
