import { useAppDispatch } from 'app/hooks';
import { useLoginMutation } from 'app/services/authApi';
import { setCredentials } from 'features/auth/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'pages/SignInPage/SignInPage.module.css';
import toast from 'react-hot-toast';

const SignInPage = (): React.ReactElement => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (): Promise<void> => {
    if (isLoading) return;
    try {
      const auth = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(auth));
      navigate('/appointments');
    } catch (err) {
      toast("Invalid credentials!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <p>Hi there! Nice to see you again</p>
      <br />
      <label>Email</label>
      <br />
      <input type="email" onChange={handleEmailChange} />
      <br />
      <label>Password</label>
      <br />
      <input type="password" onChange={handlePasswordChange} />
      <br />
      <button onClick={handleSignIn}>{isLoading ? 'Loading' : 'Sign In'}</button>
      <br />
      <p className={styles.grey}>Haven&apos;t got an Account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SignInPage;
