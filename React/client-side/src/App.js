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
import Order from './Order';
import EditOrder from './EditOrder';
import Dashboard from './dashboard/Dashboard';
import Customer from './Customer';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';



function App() {
  return (
<div>
<BrowserRouter>
        <Routes>
        
          <Route path='/users' element={<User />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/users/:id/editUser' element={<EditUser />} />

          <Route path='/products' element={<Product />} />
          <Route path='/createProduct' element={<CreateProduct />} />
          <Route path='/products/:id/editProduct' element={<EditProduct />} />

          <Route path='/categories' element={<Category />} />
          <Route path='/createCategory' element={<CreateCategory />} />
          <Route path='/categories/:id/editCategory' element={<EditCategory />} />

          <Route path='/orders' element={<Order />} />
          <Route path='/Orders/:id/editOrder' element={<EditOrder />} />

          <Route path='/customers' element={<Customer />} />
          <Route path='/createCustomer' element={<CreateCustomer />} />
          <Route path='/customers/:id/editCustomer' element={<EditCustomer />} />

          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
</div>
     

  )
}

export default App;
