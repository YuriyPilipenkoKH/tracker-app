import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const UserButton = () => {
  const navigate = useNavigate();
  const { authUser} = useAuthStore();
  const userInitial = authUser?.name ? authUser.name.charAt(0).toUpperCase() : '';
  return (
    <>
    <button 
    className='w-12 h-12 rounded-full bg-[var(--accent-color)] font-bold'
    onClick={() => navigate('/profile')}> 
      {userInitial}
    </button>
  </>
  )
}

export default UserButton