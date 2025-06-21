import { useState, type FC } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import WelcomePage from './WelcomePage/WelcomePage';
import defaultUserAvatar from '../../public/profile-icon.jpg'
import '../styles/userDetail.css'
import { UsersApi } from '../services';
import { User } from '../models';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Authorized from '../components/Authorized';
import { UserUpdateDialog } from '../components/user/UserUpdateDialog';
import useAuth from '../hooks/useAuth';

export const UserDetailPage: FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { id } = useParams();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject('No id provided');
      }
      return UsersApi.getSingle(id);
    }
  });

  const blockUserMutation = useMutation(
    (user: User) => UsersApi.block(user.id),
    {
      onSuccess: () => {
        if (user.isBlocked) {
          handleAction(`User with id: ${id} successfully UNblocked`);
        } else {
          handleAction(`User with id: ${id} successfully blocked`);
        }
      },
      onError: (error) => {
        handleAction(`Cannot block user with id: ${id}. ${error}`)
      }
    }
  )

  const deleteUserMutation = useMutation(
    (user: User) => UsersApi.deleteUser(user.id),
    {
      onSuccess: () => {
        handleAction(`User with id: ${id} successfully deleted`);
      },
      onError: (error) => {
        handleAction(`Cannot delete user with id: ${id}. ${error}`)
      }
    }
  )

  function blockUser() {
    blockUserMutation.mutate(user);
  }

  function deleteUser() {
    deleteUserMutation.mutate(user);
    navigate(-1);
  }

  const handleAction = (message: string) => {
    alert(message);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.data) {
    return <WelcomePage />;
  }

  const user: User = data.data;
  const userAvatar = !user.avatar ? defaultUserAvatar : user.avatar;
  const userName = user.userName;
  const email = user.email;
  const role = user.role;

  let isBlockedUser = <></>
  let block = "Block";

  if (user.isBlocked) {
    isBlockedUser = <h3>User is blocked</h3>
    block = "Unblock"
  }

  let editButton;
  let deleteAndBlockButton;

  if (auth?.data.id === id) {
    editButton = 
    <>
      <button className='user-page__button' type='button' onClick={() => setIsEditDialogOpen(true)}>
        Edit profile
      </button>
    </>
    deleteAndBlockButton = <></>
  } else {
    editButton = <></>
    deleteAndBlockButton = 
    <Authorized roles={["ADMIN"]}>
      <button className='user-page__button' onClick={blockUser}>{block} user</button>
      <button className='user-page__button' onClick={deleteUser}>Delete user</button>
    </Authorized>

  }

  return (
    <Authorized roles={["ADMIN", "USER"]}>
      <Header />
      <Sidebar />
      <main className='user-page anim-appear custom-scrollbar__content'>
        <div className='user-page__info'>
          <div>
            <img src={userAvatar}  className='user-page__picture' alt='Title user'/>
          </div>
          <div>
            <h2 className='user-page__role'>{role}</h2>
            <h1 className='user-page__username'>{userName}</h1>
            <h2 className='user-page__mail'>{email}</h2>
            {isBlockedUser}
          </div>
          <div className='user-page__buttons'>
            <Authorized roles={["ADMIN"]}>
              {deleteAndBlockButton}
            </Authorized>
            {editButton}
          </div>
          <UserUpdateDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} user={user} />
        </div>
      </main>
    </Authorized>
  )
}

export default UserDetailPage
