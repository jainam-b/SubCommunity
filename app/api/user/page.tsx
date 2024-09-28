"use client"

import { RootState } from '@/app/lib/store';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { loggedIn, name, publishName } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {loggedIn ? (
        <div className='text-white'>
          <h1>Welcome, {name}</h1>
          <p>Your publish name is: {publishName}</p>
        </div>
      ) : (
        <h1 className='text-white'>Please log in</h1>
      )}
    </div>
  );
};

export default Profile;