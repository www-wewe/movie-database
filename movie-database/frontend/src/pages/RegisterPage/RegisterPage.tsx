import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/registerPage.css'
import '../../styles/common.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../../models';
import { UsersApi } from '../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserFormSchema } from '../../schema/User';
import emailIcon from '../../../public/email-icon.svg';
import passwordIcon from '../../../public/password-icon.png';
import profileIcon from '../../../public/profile-icon.jpg'

const RegisterPage: FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
		defaultValues: {
				userName: "",
        email: "",
        password: "",
		},
		resolver: yupResolver(UserFormSchema),
	});

  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();
  const [error, showError] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const registerUserMutation = useMutation(
		(user: User) => UsersApi.register(user.userName, user.email, user.password),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user']);
				handleRegister();
			},
      onError: (error) => {
        console.log(error)
        showError(true);
        setTimeout(() => {
          showError(false);
        }
        , 3000)
      }
		}
	);

	const registerUser: SubmitHandler<User> = async (data) => {
		registerUserMutation.mutate(data);
	};

  const handleLogin = () => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
      navigate('/login')
    }, 500)
  }

  const handleRegister = () => {
    setAnimation(true)
    setTimeout(() => {
      alert("Successfully registered")
      setAnimation(false)
      navigate('/login')
    }, 500)
  }
  
  return (
    <form onSubmit={handleSubmit(registerUser)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(registerUser) } } }>
      <div className={`home__main ${animation ? "anim-disappear-short" : ""}`}>
        <h1 className='main__login-header'>Registration</h1>
        <div className='main__input-name'>
          <img src={profileIcon} alt="name" className='home__icon' />
          <input type="text" id="userName" placeholder='Enter your Name' className='home__fill home__input' {...register("userName")}/>
          <div>
            <span className='form__error'>{errors.userName?.message || ' '}</span>
          </div>
        </div>
        <div className='main__input-email'>
          <img src={emailIcon} alt="email" className='home__icon' />
          <input type="email" id="email" placeholder='Enter your email address' className='home__fill home__input' {...register("email")}/>
          <div>
            <span className='form__error'>{errors.email?.message || ' '}</span>
          </div>
        </div>
        <div className='main__input-password'>
          <img src={passwordIcon} alt="password" className='home__icon' />
          <input type="password" id='password' placeholder='Enter password' className='home__fill home__input' {...register("password")}/>
          <div>
            <span className='form__error'>{errors.password?.message || ' '}</span>
          </div>
        </div>
        <span className='form__error'>{error && 'Registration Failed'}</span>
        <div className='main__buttons'>
          <button className="home__button" type='submit'>Register</button>
          <p>If Account exist then</p>
          <button className="home__button" onClick={handleLogin} type='button'>Login</button>
        </div>
      </div>
    </form>
  )
}

export default RegisterPage
