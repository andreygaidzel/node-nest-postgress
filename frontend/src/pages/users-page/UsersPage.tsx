import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { useEffect } from 'react';
import { fetchUsers } from '../../store/reducers/ActionCreators.ts';

function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, error, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);
  console.log(users);
  return (
    <div className='simple-page'>
      <h1 className='page-name'>Users Page</h1>

      {isLoading && <h1>Загрузка...</h1>}
      {error && <h1>{error}</h1>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
