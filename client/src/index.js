import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import Editor from './Components/Editor/Editor';
import TestQuestion from './Components/TestQuestion/TestQuestion';
import Tutorials from './Components/Tutorials/Tutorials';
import LearningHistory from './Components/LearningHistory/LearningHistory';
import TestHistory from './Components/TestHistory/TestHistory';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/editor' element={<Editor />} />
        <Route path='/guest_editor' element={<Editor />} />
        <Route path='/dashboard/test' element={<TestQuestion />} />
        <Route path='/dashboard/tutorials' element={<Tutorials />} />
        <Route path='/dashboard/learning-history' element={<LearningHistory />} />
        <Route path='/dashboard/test-history' element={<TestHistory />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

