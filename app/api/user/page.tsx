// components/Profile.js
"use client"
import { RootState } from '@/app/lib/store';
import { useSelector } from 'react-redux';

const  page= () => {
  const { isLoggedIn, user } = useSelector((state:RootState) => state.auth);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {user.name}</h1>
        
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default page;
