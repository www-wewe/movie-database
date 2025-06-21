import { useState, type FC } from 'react'
import emailIcon from '../../../public/email-icon.svg'
import passwordIcon from '../../../public/password-icon.png'
import { useNavigate } from 'react-router-dom';
import '../../styles/loginPage.css'
import '../../styles/common.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormSchema } from '../../schema/Login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '../../services';
import { User } from '../../models';

export const LoginPage: FC = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginFormSchema),
  });

  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();
  const [error, showError] = useState<boolean>(false);
  
	const queryClient = useQueryClient();

	const loginUSerMutation = useMutation(
		(user: User) => UsersApi.login(user.email, user.password),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['user']);
				navigate('/auth/movie')
			},
      onError: () => {
        console.log()
        showError(true);
        setTimeout(() => {
          showError(false);
        }
        , 3000)
      }
		}
	);
		
	const loginUser: SubmitHandler<User> = async (data) => {
		loginUSerMutation.mutate(data);
	};

  const handleRegister = () => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
      navigate('/registration')
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit(loginUser)} onKeyDown={(e) => { if (e.key === 'Enter' ) { handleSubmit(loginUser)} } }>

      <div className={`home__main ${animation ? "anim-disappear-short" : ""}`}>
        <h1 className='main__login-header'>Login to your existing account</h1>
        <div className='main__login-inputs'>
          <div>
            <img src={emailIcon} alt="email" className='home__icon' />
            <input type="email" id="email" placeholder='Enter email' className='home__fill home__input' {...register("email")}/>
            <div>
              <span className='form__error'>{errors.email?.message || ' '}</span>
            </div>
          </div>
          <div className='main__password-input'>
            <img src={passwordIcon} alt='password' className='home__icon' />
            <input type="password" id="password" placeholder='Enter Password' className='home__fill home__input' {...register("password")}/>
            <div>
              <span className='form__error'>{errors.password?.message || ' '}</span>
            </div>
          </div>
        </div>
        <span className='form__error'>{error && 'Login Failed'}</span>
        <div className='main__buttons'>
          <button className="home__button" type='submit'>Login</button>
          <button  className="home__button" onClick={handleRegister} type='button'>Register</button>
        </div>
      </div>
    </form>
  )
}

export default LoginPage
