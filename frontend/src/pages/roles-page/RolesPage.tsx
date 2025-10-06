import RoleModal from '../../components/features/roles/RoleModal.tsx';
import { useCallback, useState } from 'react';
import type { IPost } from '../../models/IPost.ts';
import { useDeleteRoleMutation, useFetchRolesQuery } from '../../services/RoleService.ts';
import type { IRole } from '../../models/IRole.ts';

function RolesPage() {
  const [limit] = useState(100);
  const [page, setPage] = useState(1);
  const { data: roles, error, isLoading } = useFetchRolesQuery({ limit, page });
  // const [updatePost] = useUpdatePostMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const totalPages = 5;

  console.log('PostContainer render');

  const handleRemove = (post: IPost) => {
    deleteRole(post);
  };

  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, []);

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>Roles Page</h1>
        <RoleModal />
      </div>

      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      <ul>{roles && roles.map((role: IRole) => <li key={role.id}>{role.value}</li>)}</ul>
    </div>
  );
}

export default RolesPage;
