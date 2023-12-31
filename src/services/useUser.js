/* eslint-disable dot-notation */
import httpClient from '@/httpClient';
import useAuthStore from '@/stores/auth';
import { useRouter } from 'vue-router';

const useUser = () => {
  const userStore = useAuthStore();
  const router = useRouter();

  const getAccountDetails = async () => {
    if (!localStorage.getItem('accountId')) {
      const response = await httpClient.get('api/account');
      const { data } = response;
      localStorage.setItem('accountId', data.id);
      localStorage.setItem('username', data.username);
    }
  };

  const login = async (username, password) => {
    const request = {
      username,
      password,
    };
    httpClient.post('api/public/login', request)
      .then((response) => {
        if (!response.data.token) return;
        userStore.setCredentials(response.data.token);
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        getAccountDetails();
        router.push('/');
      }).catch((error) => alert(error.response.data.message));
  };
  const register = (username, password) => {
    const request = {
      username,
      password,
    };
    httpClient.post('api/public/register', request)
      .then((response) => {
        if (response.data.reason !== 'register successful');
        login(username, password);
      }).catch((error) => alert(error.response.data.message));
  };
  const logout = () => {
    userStore.clearCredentials();
    router.go('/');
    httpClient.defaults.headers.common['Authorization'] = null;
  };

  const deleteAccount = (id) => {
    httpClient.delete(`api/account/delete/${id}`);
    logout();
  };
  return {
    login,
    logout,
    register,
    deleteAccount,
  };
};

export default useUser;
