import { ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import { LOGIN_PATH } from '@/data/constant';
import { useAuthStore } from '@/hook';

type Props = {
  children: ReactElement;
};

const PrivateRouter = ({ children }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = useAuthStore((state: any) => state.token);

  return token ? <>{children}</> : <Navigate to={LOGIN_PATH} replace />;
};

export default PrivateRouter;