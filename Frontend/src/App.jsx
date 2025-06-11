import './App.css'
import Login from './components/Login'
import { Provider } from 'react-redux';
import store from './redux/store';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'  
import Admin from './components/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;