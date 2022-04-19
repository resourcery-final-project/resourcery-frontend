import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

export default function ResourceForm(isCreating) {
  const [formImage, setFormImage] = useState(null);
  const [rescource, setResource] = useState({});

  const { formState, handleFormChange } = useForm({
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

  const handleSave = (e) => {
    e.preventDefault();
    console.log('hello');
  };

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUDINARY_NAME,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
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
          <option value="food-bank">Food Bank</option>
          <option value="fruit-tree">Fruit Tree</option>
          <option value="free-meals">Free Meals</option>
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
        <input
          name="address"
          type="text"
          placeholder="address"
          aria-label="address"
          value={formState.address}
          onChange={handleFormChange}
        />
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
