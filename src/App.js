import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {Addproduct} from './components/Addproduct';
import {Updateproduct} from './components/Updateproduct';


function App() {

  return (
    <div className="container">
      <Router>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={< Addproduct />} />
        <Route path="/update/:userid" element={< Updateproduct />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
