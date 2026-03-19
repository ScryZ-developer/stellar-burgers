import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
