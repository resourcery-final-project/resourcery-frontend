import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../../components/Detail/Detail';
import { getDetailById } from '../../services/resources';

export default function ResourceDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getDetailById(id);
      setDetail(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await deleteById(id);
    return data;
  };

  return (
    <div>
      <Detail detail={detail} handleDelete={handleDelete} />
    </div>
  );
}
