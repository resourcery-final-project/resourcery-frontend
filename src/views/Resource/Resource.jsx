import ResourceForm from '../../components/ResourceForm/ResourceForm';
import { useForm } from '../../hooks/useForm';
import { createResource } from '../../services/resources';

export default function Resource({ isCreating = false }) {
  const handleResource = async (formState) => {
    if (isCreating) {
      const data = await createResource(formState);
      return data;
    }
  };

  return (
    <div>
      <ResourceForm isCreating={isCreating} handleResource={handleResource} />
    </div>
  );
}
