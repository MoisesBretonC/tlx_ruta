import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from './pages/TasksPage';
import TasksFromPage from './pages/TasksFromPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';



function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* Rutas Publicas */}
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>

       <Route element={<ProtectedRoute/>}>
         {/* Rutas Privadas (Es decir no deberian funcionar a menos que el Usuario este autenticado) */}
         <Route path='/tasks' element={<TasksPage/>}></Route>
        <Route path='/add-task' element={<TasksFromPage/>}></Route>
        <Route path='/tasks/:id' element={<TasksFromPage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
       </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App;