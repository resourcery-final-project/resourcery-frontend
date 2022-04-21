import { useState, useEffect } from 'react';
import { getProfileList } from '../../services/resources';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';
import { useUser } from '../../context/UserContext';

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [profileList, setProfileList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfileList(user.id);
        setProfileList(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <h2>Loading Profile...</h2>;

  return (
    <>
      <ProfileDetail profileList={profileList} />
    </>
  );
}
