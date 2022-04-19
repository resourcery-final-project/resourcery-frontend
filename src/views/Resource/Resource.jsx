import ResourceForm from '../../components/ResourceForm/ResourceForm';

export default function Resource({ isCreating = false }) {
  const handleResource = (
    type,
    description,
    image,
    hours,
    title,
    address,
    phone
  ) => {
    if (isCreating) {
    }
  };

  return (
    <div>
      <ResourceForm isCreating={isCreating} />
    </div>
  );
}
