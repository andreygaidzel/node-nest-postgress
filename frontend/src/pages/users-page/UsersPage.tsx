import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { useEffect } from 'react';
import { fetchUsers } from '../../store/reducers/ActionCreators.ts';
import UserModal from '../../components/features/users/UserModal.tsx';

function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, error, isLoading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>Users Page</h1>
        <UserModal />
      </div>
      {isLoading && <h1>Загрузка...</h1>}
      {error && <h1>{error}</h1>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
