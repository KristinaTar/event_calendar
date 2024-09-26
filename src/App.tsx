import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import MainPage from "./components/MainPage/mainPage";


function App() {
  return (
    <ChakraProvider>
    <div style={{ height: '95vh' }}>
   <MainPage/>
    </div>
    </ChakraProvider>
  );
}

export default App;
