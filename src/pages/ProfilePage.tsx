import AvatarUploadForm from "../components/forms/AvatarUploadForm";
import ProfileForm from "../components/forms/ProfileForm";
import AccountInfo from "../components/profile/AccountInfo.orig";



const ProfilePage = () => {
  return (
     <div className="grid pt-5 transition-all duration-800 ease-in-out">
      <div className=" mx-auto p-4 py-8 w-[320px] md:w-[500px]">
        <div className="bg-base-300 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <AvatarUploadForm />
          <ProfileForm  />
          <AccountInfo/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage