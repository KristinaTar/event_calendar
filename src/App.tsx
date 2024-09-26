import React from 'react';
import './App.css';
import MainPage from "./components/MainPage/mainPage";
import { ChakraProvider } from "@chakra-ui/react";

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
