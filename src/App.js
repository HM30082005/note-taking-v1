import './App.css'
import Footer from './components/footer';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemList from './pages/recorded';
import CheckPersonForm from './pages/checkPerson';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/data' element={<ItemList />}/>
            <Route path='/check' element={<CheckPersonForm />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
