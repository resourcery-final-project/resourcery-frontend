import { useForm } from '../../hooks/useForm';

export default function ResourceForm() {
  const { formState, handleFormChange } = useForm({
    latitude: null,
    longitude: null,
    type: '',
    description: '',
    image: '',
    hours: '',
    available: false,
    title: '',
    address: '',
    phone: '',
  });

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUDINARY_NAME,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
      }
    }
  );
  return (
    <form>
      <h2>Offer a new resource</h2>
      <label>
        Title:
        <input
          name="title"
          type="text"
          placeholder="title"
          aria-label="title"
          value={formState.title}
          onChange={handleFormChange}
        />
      </label>

      <button
        name="image"
        id="upload_widget"
        value={formState.image}
        onClick={() => myWidget.open()}
      >
        Upload an Image
      </button>

      <label>
        Type:
        <select name="type" id="type">
          <option value="">Select</option>
          <option value="food-bank">Food Bank</option>
          <option value="fruit-tree">Fruit Tree</option>
          <option value="free-meals">Free Meals</option>
        </select>
      </label>

      <label>
        Description:
        <input />
      </label>

      <label>
        Hours:
        <input />
      </label>

      <label>
        Address / Coordinates:
        <input />
      </label>

      <label>
        Phone:
        <input />
      </label>

      <label>
        Currently Available:
        <select name="available" id="available">
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <button>Save</button>
    </form>
  );
}
