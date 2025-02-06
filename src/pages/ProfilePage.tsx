import AvatarUploadFormCustom from "../components/forms/AvatarUploadForm.custom";
import ProfileForm from "../components/forms/ProfileForm";
import AccountInfo from "../components/profile/AccountInfo.orig";
import { useAuthStore } from "../store/useAuthStore";


const ProfilePage = () => {
const {authUser} = useAuthStore()
console.log('authUser',authUser);

  return (
     <div className="grid pt-20 transition-all duration-800 ease-in-out">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* <AvatarUploadForm /> */}
          <AvatarUploadFormCustom />
          <ProfileForm  />
          <AccountInfo/>
        </div>
      </div>
    </div>
  );
  
}

export default ProfilePage