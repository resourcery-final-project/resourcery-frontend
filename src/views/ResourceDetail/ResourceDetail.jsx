import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Detail from '../../components/Detail/Detail';
import { getDetailById, deleteById } from '../../services/resources';

export default function ResourceDetail() {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const data = await getDetailById(id);
      setDetail(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirm('Are you sure you want to delete?') == true) {
        await deleteById(id);
        history.replace('/user');
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) return <h2>Loading Resource...</h2>;

  return (
    <div>
      <Detail detail={detail} handleDelete={handleDelete} />
    </div>
  );
}
