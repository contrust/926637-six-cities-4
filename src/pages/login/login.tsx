import { FormEvent, useRef, useState } from 'react';
import Logo from '../../components/logo/logo';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus, CityToOffer } from '../../const';
import { redirectToRoute, setCityToOffer } from '../../store/action';
import { Link } from 'react-router-dom';
import { HttpStatusCode } from 'axios';

function getRandomCityToOffer(): CityToOffer {
  const citiesToOffer = Object.values(CityToOffer);
  const randomIndex = Math.floor(Math.random() * citiesToOffer.length);
  return citiesToOffer[randomIndex];
}

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.authStatus);

  if (authStatus === AuthStatus.Auth){
    dispatch(redirectToRoute(AppRoute.Main));
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      })).then((result) => {
        setIsErrorOccured(result.payload !== HttpStatusCode.Ok);
      });
    }
  };

  const randomCity = getRandomCityToOffer();

  const handleAmsterdamOnClick = () => dispatch(setCityToOffer(randomCity));

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {
                isErrorOccured ? <label style={{color: 'red'}}>Error occured during authorization</label> : ''
              }
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleAmsterdamOnClick}>
                <span>{randomCity.toString()}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
