import { useState, useEffect } from 'react';
import { getProfileList } from '../../services/resources';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';
import { useUser } from '../../context/UserContext';

export default function UserProfile() {
  const [profileList, setProfileList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      const data = await getProfileList(user.id);
      setProfileList(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <ProfileDetail profileList={profileList} />
    </>
  );
}
