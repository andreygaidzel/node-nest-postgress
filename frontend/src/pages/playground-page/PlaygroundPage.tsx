import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../store/reducers/ActionCreators.ts';
import UserModal from '../../components/features/users/UserModal.tsx';
import Component1 from '../playground-page/Component1.tsx';
import type { User } from '../../../../backend/src/users/users.model.ts';
import { baseUrl } from '../../shared/constants/baseConfig.ts';

async function getUsers(): Promise<User[]> {
  let response;
  response = await fetch(`${baseUrl}/users`);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return await response.json();
}

async function getUser(id: number): Promise<User[]> {
  let response;
  response = await fetch(`${baseUrl}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return await response.json();
}

function PlaygroundPage() {
  const dispatch = useDispatch<AppDispatch>();
  // const { users, error, isLoading } = useSelector((state: RootState) => state.user);
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const getUsersFn = async () => {
      setIsLoading(true);
      try {
        const users = await getUsers();
        const user = await getUser(users[0].id);
        console.log(22, users, user);
        setIsLoading(false);
        setUserList(users);
      } catch (e) {
        console.error(e);
        setError('Error: ' + e);
      }
    };
    getUsersFn();
  }, []);

  const [timers, setTimers] = useState<number[]>([]);

  const handleAddTimer = () => setTimers((timers) => [...timers, 1]);
  const handleRemoveTimer = () => setTimers((prev) => prev.slice(0, prev.length - 1));

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>Playground Page</h1>
        <UserModal />
      </div>

      <div className='flex'>
        <button onClick={handleAddTimer}>Add timer</button>
        <button onClick={handleRemoveTimer}>Remove timer</button>
      </div>
      {timers.map((_, index) => {
        return <Component1 key={index} index={index} />;
      })}

      {isLoading && <h1>Загрузка...</h1>}
      {error && <h1>{error}</h1>}
      <ul>
        {userList?.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaygroundPage;
