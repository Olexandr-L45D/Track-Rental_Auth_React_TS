import { useDispatch } from 'react-redux';
import { notifyError } from '../../hooks/notifications';
import { getOauthUrl } from '../../redux/auth/operations';
import css from './GoogleLoginButton.module.css';
import { FcGoogle } from 'react-icons/fc';
import { AppThunkDispatch } from '../../redux/store';

export interface Props {
  children: React.ReactNode;
}

const GoogleLoginButton = ({ children }: Props): JSX.Element => {
  const dispatch: AppThunkDispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const {
        data: { url },
      } = await dispatch(getOauthUrl());
      window.location.href = url;
    } catch (error: any) {
      notifyError(error.message);
    }
  };
    return (
   
    <button onClick={handleGoogleLogin} className={css.button} type="button" >
       { children }
      <FcGoogle className={css.icon} size={35} />
    </button>
  );
}

export default GoogleLoginButton;

