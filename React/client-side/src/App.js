import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './User';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import Product from './Product';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import Category from './Category';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';

function App() {
return(
<BrowserRouter>
<Routes>
  <Route path='/users' element={<User/>}/>
  <Route path='/createUser' element={<CreateUser/>}/>
  <Route path='/users/:id/editUser' element={<EditUser/>}/>

  <Route path='/products' element={<Product/>}/>
  <Route path='/createProduct' element={<CreateProduct/>}/>
  <Route path='/products/:id/editProduct' element={<EditProduct/>}/>

  <Route path='/categories' element={<Category/>}/>
  <Route path='/createCategory' element={<CreateCategory/>}/>
  <Route path='/categories/:id/editCategory' element={<EditCategory/>}/>
</Routes>
</BrowserRouter>
)
}

export default App;
