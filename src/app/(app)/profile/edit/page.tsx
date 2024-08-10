import ProfileForm from './profile-form';

export default async function Page() {
  // let profileData = {};

  // const fetchUser = async () => {
  //   try {
  //     const response = await fetch(`/api/profile`);
  //     const data = await response.json();
  //     profileData = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchUser();

  return <ProfileForm />;
}
