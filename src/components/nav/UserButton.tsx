import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const UserButton = () => {
  const navigate = useNavigate();
  const { authUser} = useAuthStore();
  const userInitial = authUser?.name ? authUser.name.charAt(0).toUpperCase() : '';
  return (
    <>
    <button 
    className='w-20 h-20 rounded-full'
    onClick={() => navigate('/profile')}> 
      {userInitial}
    </button>
  </>
  )
}

export default UserButton