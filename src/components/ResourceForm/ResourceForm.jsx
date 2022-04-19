import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddressSearch from '../AddressSearch/AddressSearch';

export default function ResourceForm({ isCreating, handleResource }) {
  const [formImage, setFormImage] = useState(null);

  const history = useHistory();

  const { formState, setFormState, handleFormChange } = useForm({
    latitude: null,
    longitude: null,
    type: '',
    description: '',
    image: '',
    hours: '',
    title: '',
    address: '',
    phone: '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await handleResource(formState);
    history.replace('/user');
  };

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        setFormImage(result.info.url);
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

      {!formImage ? (
        <button
          name="image"
          id="upload_widget"
          value={formState.image}
          onChange={handleFormChange}
          onClick={(e) => {
            e.preventDefault();
            myWidget.open();
          }}
        >
          Upload an Image
        </button>
      ) : (
        <img src={formImage} />
      )}

      <label>
        Type:
        <select
          name="type"
          id="type"
          value={formState.type}
          onChange={handleFormChange}
        >
          <option value="">Select</option>
          <option value="Food Bank">Food Bank</option>
          <option value="Food Box">Food Box</option>
          <option value="Fruit Tree">Fruit Tree</option>
          <option value="Ready To Eat">Ready To Eat</option>
        </select>
      </label>

      <label>
        Description:
        <input
          name="description"
          type="text"
          placeholder="description"
          aria-label="description"
          value={formState.description}
          onChange={handleFormChange}
        />
      </label>

      <label>
        Hours:
        <input
          name="hours"
          type="text"
          placeholder="hours"
          aria-label="hours"
          value={formState.hours}
          onChange={handleFormChange}
        />
      </label>

      <label>
        Address:
        <AddressSearch setFormState={setFormState} />
      </label>

      <label>
        Phone:
        <input
          name="phone"
          type="text"
          placeholder="phone"
          aria-label="phone"
          value={formState.phone}
          onChange={handleFormChange}
        />
      </label>

      <button onClick={handleSave}>Save</button>
    </form>
  );
}
