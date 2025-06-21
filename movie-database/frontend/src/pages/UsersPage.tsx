import { type FC } from 'react'
import UsersFilter from '../components/user/UsersFilter'
import Users from '../components/user/Users'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Authorized from '../components/Authorized'

const UsersPage: FC = () => {
  return (
    <Authorized roles={["ADMIN"]}>
      <Header />
      <Sidebar />
      <div className="main-view anim-appear custom-scrollbar__content">
        <div className="main-view__header">
            <div className="main-view__title">
            <h2>Users</h2>
            </div>
        </div>
        
        <div className="main-view__content">
          <UsersFilter/> 
          <Users />
        </div>
      </div>
    </Authorized>
  )
}

export default UsersPage
