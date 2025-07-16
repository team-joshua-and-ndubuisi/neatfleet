import React from 'react';
import { UserType, useUsers, User } from '@/features/users';
import { LoadingIndicator, ErrorComponent } from '@/components';

const UserList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorComponent />;

  return (
    <ul className='space-y-1'>
      {users?.map((user: UserType) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;
