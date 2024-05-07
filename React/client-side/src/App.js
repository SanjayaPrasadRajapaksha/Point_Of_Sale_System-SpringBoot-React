import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './User';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

function App() {
return(
<BrowserRouter>
<Routes>
  <Route path='/users' element={<User/>}/>
  <Route path='/createUser' element={<CreateUser/>}/>
  <Route path='/users/:id/editUser' element={<EditUser/>}/>
</Routes>
</BrowserRouter>
)
}

export default App;
