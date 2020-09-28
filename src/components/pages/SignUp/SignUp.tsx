import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userRegistration } from '../../../redux/actions';

import { IFormSignUpSubmit } from '../../../types';
import './index.css';

const SignOut: React.FC = () => {
  const dispatch: Function = useDispatch();
  const isRegisterOkey: boolean = useSelector(
    (state: any) => state.user.isRegisterOkey
  );
  const isAuthentication: boolean = useSelector(
    (state: any) => state.user.isAuthentication
  );
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm<IFormSignUpSubmit>();

  const onSubmit = ({ username, email, password }: IFormSignUpSubmit) => {
    const user = {
      user: { username, email, password },
    };
    userRegistration(dispatch, user);
  };

  useEffect(() => {
    if (!isRegisterOkey) history.push('/');
  }, [isRegisterOkey]);

  useEffect(() => {
    if (isAuthentication) history.push('/');
  }, [isAuthentication]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="form">
      <h3 className="form__title">Create new account</h3>
      <label htmlFor="username" className="form__label">
        <span className="form__label-text">Username</span>
        <input
          type="text"
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          name="username"
          id="username"
          className="form__input"
          placeholder="Username"
        />
        {errors.username && (
          <span className="form__input-error">
            Your username must be between 3 and 20 characters (inclusive).
          </span>
        )}
      </label>
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
            minLength: 6,
            maxLength: 40,
          })}
          name="password"
          id="password"
          className="form__input"
          placeholder="password"
        />
        {errors.password && (
          <span className="form__input-error">
            Your password must be between 6 and 40 characters (inclusive).
          </span>
        )}
      </label>
      <label htmlFor="repeat-password" className="form__label">
        <span className="form__label-text">Repeat password</span>
        <input
          type="password"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          name="repeat-password"
          id="repeat-password"
          className="form__input"
          placeholder="password"
        />
        {errors['repeat-password'] && (
          <span className="form__input-error">Passwords must match</span>
        )}
      </label>
      <div className="form__line" />
      <label htmlFor="agree" className="form__label form__checkbox-container">
        <input
          type="checkbox"
          ref={register({
            required: true,
          })}
          name="agree"
          className="form__checkbox"
          id="agree"
          defaultChecked
        />
        {errors.agree && (
          <p className="form__input-error">
            Confirm your consent to the processing of personal data.
          </p>
        )}
        <span className="form__label-text">
          I agree to the processing of my personal information
        </span>
      </label>
      <input type="submit" className="form__submit" value="Create" />
      <p className="already-account">
        Already have an account?
        <Link to="/sign-in">
          <span className="already-account__href-login">Sign In</span>
        </Link>
      </p>
    </form>
  );
};

export default SignOut;
