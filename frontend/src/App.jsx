import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavPage from './NavPage';
import Home from './Home';
import Pos from './Pos';

function App() {

  return (
    <>
    <NavPage/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Pos/>}/>
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
