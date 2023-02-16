import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./components/Theme/Theme";
import Root from "./routes/Root";
import GiveContextProvider from "./Context/GiveId";
import ReturnTotalProvider from "./Context/ReturnTotalAccount";


function App() {
  return (
    <ReturnTotalProvider>
      <GiveContextProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Root />
        </ThemeProvider>
      </GiveContextProvider>
    </ReturnTotalProvider>
  );
}

export default App;
