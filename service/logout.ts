import {clearUserDisplayData} from '@/reducerSlices/userDisplayData';
import {useAppDispatch} from '../constants/utils/hooks';
import {setAcessToken, setLoginStatus} from '../reducerSlices/loginSlice';
import {router} from 'expo-router';
import {useQueryClient} from '@tanstack/react-query';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.invalidateQueries();
    dispatch(
      setLoginStatus({
        loggedIn: false,
      }),
    );
    dispatch(
      setAcessToken({
        access_token: '',
        refresh_token: '',
      }),
    );
    dispatch(clearUserDisplayData());
    router.replace('/login');
  };

  return {
    logout,
  };
};

export default useLogout;
