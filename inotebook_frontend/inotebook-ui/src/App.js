import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {

  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const updateProgress = (progress)=>{
    setProgress(progress);
  }

  const showAlert =(type, msg) =>{
    setAlert({type:type, msg:msg});
  }

  return (
    <>
    <NoteState>
    <Router>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=>setProgress(0)} 
      height={3} loaderSpeed={1500} />
     <Navbar updateProgress={updateProgress} />
     <Alert alert={alert} />
     <div className="container">
     <Routes>
     <Route exact path='/' element={<Home key="home" />} />
     <Route exact path='/aboutus' element={<Aboutus key="aboutus" />} />
     </Routes>
     </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
