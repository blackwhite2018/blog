import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userUpdateProfile } from '../../../redux/actions';
import { IFormProfileSubmit } from '../../../types';
import './index.css';

const Profile: React.FC = () => {
  const dispatch: Function = useDispatch();
  const isAuthentication = useSelector<boolean>(
    (state: any) => state.user.isAuthentication
  );
  const user = useSelector((state: any) => state.user.user);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm<IFormProfileSubmit>();

  const onSubmit = (value: any): void => {
    const newUserData: any = {
      user: {},
    };

    for (const key of Object.keys(value)) {
      if (user[key] !== value[key] && value[key]) {
        newUserData.user[key] = value[key];
      }
    }

    userUpdateProfile(dispatch, newUserData, user.token);
  };

  useEffect(() => {
    if (!isAuthentication) {
      history.push('/sign-in');
    }
  }, [isAuthentication]);

  const { username = '', email = '', image = '' } = user;

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="form">
      <h3 className="form__title">Edit Profile</h3>
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
          defaultValue={username}
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
          defaultValue={email}
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
        <span className="form__label-text">New password</span>
        <input
          type="password"
          ref={register({
            minLength: 6,
            maxLength: 40,
          })}
          name="password"
          id="password"
          className="form__input"
          placeholder="New password"
        />
        {errors.password && (
          <span className="form__input-error">
            Your password must be between 6 and 40 characters (inclusive).
          </span>
        )}
      </label>
      <label htmlFor="url" className="form__label">
        <span className="form__label-text">Avatar image (url)</span>
        <input
          type="url"
          defaultValue={image}
          ref={register({
            pattern: /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/,
          })}
          name="url"
          id="repeat-password"
          className="form__input"
          placeholder="Avatar image (url)"
        />
        {errors.url && (
          <span className="form__input-error">Invalid url - address.</span>
        )}
      </label>
      <input type="submit" className="form__submit" value="Save" />
    </form>
  );
};

export default Profile;
