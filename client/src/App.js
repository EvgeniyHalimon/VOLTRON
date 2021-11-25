import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/signup"  element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;