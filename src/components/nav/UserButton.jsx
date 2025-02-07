import React from 'react'

const UserButton = () => {
  const { authUser} = useAuthStore();
  const userInitial = authUser?.name ? authUser.name.charAt(0).toUpperCase() : '';
  return (
    <div>UserInfo</div>
  )
}

export default UserButton