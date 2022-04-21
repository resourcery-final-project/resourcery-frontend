import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createResource,
  getDetailById,
  updateResource,
} from '../../services/resources';
import ResourceForm from '../../components/ResourceForm/ResourceForm';

export default function Resource({ isCreating = false }) {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getDetailById(id);
      setResource(data);
      setLoading(false);
    }
    if (!isCreating) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleResource = async (formState, id) => {
    try {
      if (isCreating) {
        await createResource(formState);
      } else {
        await updateResource(formState, id);
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) return <h1>Loading Resource...</h1>;

  return (
    <div>
      <ResourceForm
        isCreating={isCreating}
        handleResource={handleResource}
        resource={resource}
      />
    </div>
  );
}
