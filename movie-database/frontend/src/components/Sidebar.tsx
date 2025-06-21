import { Link, useNavigate } from 'react-router-dom'
import { type FC } from 'react'
import dot from '../../public/assets/icons/dot.jpg'
import { UsersApi } from '../services';
import useAuth from '../hooks/useAuth';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import Authorized from './Authorized';

const Sidebar: FC = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <WelcomePage/>
  }

  const id = auth.data.id;

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/logout')
    UsersApi.logout();
  }

  return (
    <nav className="sidebar">
      <Authorized roles={["ADMIN", "USER"]}>
        <div>
          <div className="sidebar__header">
            <h1>Movie database</h1>
          </div>

          <ul className="sidebar__list">
            <Link to={`/auth/user/${id}`}>
              <div className='sidebar__item'>
                <img src={dot} alt='dot icon' className='sidebar__icon'/>
                <span className="sidebar__name">Profile</span>
              </div>
            </Link>

            <Link to={`/auth/movie`}>
              <div className='sidebar__item'>
                <img src={dot} alt='dot icon' className='sidebar__icon'/>
                <span className="sidebar__name">Movies</span>
              </div>
            </Link>

            <Link to={`/auth/director`}>
              <div className='sidebar__item'>
                <img src={dot} alt='dot icon' className='sidebar__icon'/>
                <span className="sidebar__name">Directors</span>
              </div>
            </Link>

            <Authorized roles={["ADMIN"]}>
            <Link to={`/auth/user`}>
              <div className='sidebar__item'>
                <img src={dot} alt='dot icon' className='sidebar__icon'/>
                <span className="sidebar__name">Users</span>
              </div>
            </Link>

            <Link to={`/auth/category`}>
              <div className='sidebar__item'>
                <img src={dot} alt='dot icon' className='sidebar__icon'/>
                <span className="sidebar__name">Categories</span>
              </div>
            </Link>
          </Authorized>
        </ul>
      </div>
      <div>
        <button type="submit" onClick={handleLogout} className='sidebar__logout'>Logout</button>
      </div>
    </Authorized>
  </nav>
  )
}

export default Sidebar
