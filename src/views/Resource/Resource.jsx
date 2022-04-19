import ResourceForm from '../../components/ResourceForm/ResourceForm';
import { useForm } from '../../hooks/useForm';
import { createResource } from '../../services/resources';

export default function Resource({ isCreating = false }) {
  const handleResource = async (formState, userId) => {
    if (isCreating) {
      const data = await createResource(formState, userId);
      return data;
    }
  };

  return (
    <div>
      <ResourceForm isCreating={isCreating} handleResource={handleResource} />
    </div>
  );
}
