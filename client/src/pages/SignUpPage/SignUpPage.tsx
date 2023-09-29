import { useSignUpMutation } from "app/services/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "pages/SignUpPage/SignUpPage.module.css";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "utils";

const SignUpPage = (): React.ReactElement => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(event.target.value);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
  }

  const handleSignUp = async (): Promise<void> => {
    if (isLoading) return;
    if (email === '' || password === '') {
      toast('You need to enter both email and password fields');
      return;
    }
    if (!(password === confirmPassword)) {
      toast('Passwords dont match!');
      return
    }
    if (!isChecked) {
      toast('You need to agree to the Privacy Policy!');
      return;
    }
    try {
      await signUp({
        email,
        password
      }).unwrap();
      toast('Successful sign up! Logged you in.');
      navigate('/appointments');
    } catch (err) {
      const messages = (err as any)?.data?.message;
      messages?.forEach((message: string) => toast(capitalizeFirstLetter(message)));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <br />
      <label>Email</label>
      <br />
      <input type="email" placeholder="Your email address" onChange={handleEmailChange} />
      <br />
      <label>Password</label>
      <br />
      <input type="password" onChange={handlePasswordChange} />
      <br />
      <label>Confirm Password</label>
      <br/>
      <input type="password" onChange={handleConfirmPasswordChange} />
      <br />
      <div className={styles.flex}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <div>I agree to the <a>Terms of Services</a> and <a>Privacy Policy</a></div>
      </div>
      <br />
      <button onClick={handleSignUp}>{isLoading ? 'Loading' : 'Continue' }</button>
      <br />
      <p className={styles.grey}>Have an Account? <a href="/">Sign In</a></p>
    </div>
  );
};

export default SignUpPage;