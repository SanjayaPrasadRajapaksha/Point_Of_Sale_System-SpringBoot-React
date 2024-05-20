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
import Login from './Login';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoutes from './utils/ProtectedRoutes.js';



function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>

            <Route path='/users' element={<User />} />
            <Route path='/users/createUser' element={<CreateUser />} />
            <Route path='/users/:id/editUser' element={<EditUser />} />

            <Route path='/products' element={<Product />} />
            <Route path='/products/createProduct' element={<CreateProduct />} />
            <Route path='/products/:id/editProduct' element={<EditProduct />} />

            <Route path='/categories' element={<Category />} />
            <Route path='/categories/createCategory' element={<CreateCategory />} />
            <Route path='/categories/:id/editCategory' element={<EditCategory />} />

            <Route path='/orders' element={<Order />} />
            <Route path='/Orders/:id/editOrder' element={<EditOrder />} />

            <Route path='/customers' element={<Customer />} />
            <Route path='/customers/createCustomer' element={<CreateCustomer />} />
            <Route path='/customers/:id/editCustomer' element={<EditCustomer />} />
          </Route>


          <Route path='/login' element={<Login />} />



          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
