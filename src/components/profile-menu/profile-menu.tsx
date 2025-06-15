import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../features/user/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result) {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
