import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/home/layout';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import View from '../src/components/view/view';
import Create from '../src/components/create/create';
import theme from './components/theme';
import ViewDetail from './components/view/viewdetail';
import CreateSanitized from './components/create/createSanitized';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/view' element={<View />}></Route>
        <Route path='/viewdetail' element={<ViewDetail />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/createsan' element={<CreateSanitized />}></Route>
      </Route>
    </Routes>
  </ChakraProvider>
  );
}

export default App;
