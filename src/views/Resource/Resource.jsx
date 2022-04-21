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
  const [formError, setFormError] = useState('');
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
      setFormError(error.message);
    }
  };

  if (loading) return <h2>Loading Resource...</h2>;

  return (
    <div>
      <ResourceForm
        handleResource={handleResource}
        resource={resource}
        formError={formError}
      />
    </div>
  );
}
