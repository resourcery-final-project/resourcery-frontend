import { useEffect, useState } from 'react';
import ResourceForm from '../../components/ResourceForm/ResourceForm';
import { useParams } from 'react-router-dom';
import { createResource, getDetailById } from '../../services/resources';

export default function Resource({ isCreating = false }) {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  if (!isCreating) {
    useEffect(() => {
      async function fetchData() {
        const data = await getDetailById(id);
        setResource(data);
        setLoading(false);
      }
      fetchData();
    }, [id]);
    console.log(resource);
  }

  const handleResource = async (formState) => {
    try {
      if (isCreating) {
        await createResource(formState);
      } else {
        await updateResourceById(formState);
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
