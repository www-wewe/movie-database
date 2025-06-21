import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/welcomePage.css'
import '../../styles/Common.css'

const WelcomePage: FC = () => {

  const [animation, setAnimation] = useState(false)
  const navigate = useNavigate()

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
      setAnimation(false)
      navigate('/registration')
    }, 500)
  }

  return (
    <div className={`home__main ${animation ? "anim-disappear-short" : ""}`}>
      <div className='main__text'>
        <h1>Welcome to our Movie database, where you can find the best films ever!</h1>
        <i>There is more than 1 000 films, waiting for you! </i>
        <i>Login to your existing account, or register and watch films for free!</i>
      </div>
      <div className='main__buttons'>
        <button className="home__button" onClick={handleLogin} type='button'>Login</button>
        <button  className="home__button" onClick={handleRegister} type='button'>Register</button>
      </div>
    </div>
  )
}

export default WelcomePage
