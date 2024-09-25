// components/Profile.js
"use client"
// import { RootState } from '@/app/lib/store';
// import { useSelector } from 'react-redux';

const page = () => {
  // const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {/* {isLoggedIn ? (
        // TypeScript error here because 'username' does not exist on 'user'
        <h1>Welcome, {user.username}</h1> 
      ) : (
        <h1>Please log in</h1>
      )} */}
      <h1>Please log in</h1> 
    </div>
  );
};

export default page;
