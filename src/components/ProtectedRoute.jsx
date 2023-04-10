import { Outlet } from 'react-router-dom';
import Login from './Login';



export default  function ProtectedRoute() {
    const user = localStorage.getItem('user') || '{}'
    const isAuth = JSON.parse(user).length > 0;
    return  isAuth ? <Outlet/> : <Login/>
}
