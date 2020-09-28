import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthentication } from '../../../redux/actions';

import { IFormSignInSubmit } from '../../../types';
import './index.css';

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch: Function = useDispatch();
  const isAuthenticationOkey: boolean = useSelector(
    (state: any) => state.user.isAuthenticationOkey
  );
  const isAuthentication: boolean = useSelector(
    (state: any) => state.user.isAuthentication
  );
  const { register, handleSubmit, errors } = useForm<IFormSignInSubmit>();

  const onSubmit = ({ email, password }: IFormSignInSubmit) => {
    const user = {
      user: { email, password },
    };
    userAuthentication(dispatch, user);
  };

  useEffect(() => {
    if (!isAuthenticationOkey) history.push('/');
  }, [isAuthenticationOkey]);

  useEffect(() => {
    if (isAuthentication) history.push('/');
  }, [isAuthentication]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="form">
      <h3 className="form__title">Sign In</h3>
      <label htmlFor="email" className="form__label">
        <span className="form__label-text">Email address</span>
        <input
          type="email"
          ref={register({
            required: true,
            pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
          })}
          name="email"
          id="email"
          className="form__input"
          placeholder="Email address"
        />
        {errors.email && (
          <span className="form__input-error">Invalid email</span>
        )}
      </label>
      <label htmlFor="password" className="form__label">
        <span className="form__label-text">Password</span>
        <input
          type="password"
          ref={register({
            required: true,
          })}
          name="password"
          id="password"
          className="form__input"
          placeholder="password"
        />
        {errors.password && (
          <span className="form__input-error">Enter password</span>
        )}
      </label>
      <input type="submit" className="form__submit" value="Login" />
      <p className="no-have-account">
        Don\'t have an account?
        <Link to="/sign-up">
          <span className="no-have-account__href-login">Sign Up</span>
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
