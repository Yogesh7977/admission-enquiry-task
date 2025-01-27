import './App.css';
import EnqueryForm from './components/EnqueryForm';
import { BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
 import RegisterAdmin from './components/RegisterAdmin';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
function App() {
  return (
    <>
    <Router>
    <Routes >
    <Route path="/" element={<EnqueryForm/>}/>
    <Route path="/registerAdmin" element={<RegisterAdmin/>}/>
    <Route path="/adminLogin" element={<AdminLogin/>}/>
    <Route path="/adminHome" element={<AdminHome/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
