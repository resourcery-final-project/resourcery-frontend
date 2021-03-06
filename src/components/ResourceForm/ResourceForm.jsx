import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import AddressSearch from '../AddressSearch/AddressSearch';
import { useMarkerCoords } from '../../context/MarkerContext';
import styles from '../../App.module.css';

export default function ResourceForm({ handleResource, resource, formError }) {
  const history = useHistory();
  const {markerCoords} = useMarkerCoords();
  const { form, img, resourceform } = styles;

  const { formState, setFormState, handleFormChange } = useForm({
    latitude: resource.latitude || markerCoords.lat || null,
    longitude: resource.longitude || markerCoords.lng || null,
    type: resource.type || '',
    description: resource.description || '',
    image: resource.image || '',
    hours: resource.hours || '',
    title: resource.title || '',
    address: resource.address || '',
    phone: resource.phone || '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await handleResource(formState, resource.id);
    history.replace('/user');
  };

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setFormState((prevState) => {
          return { ...prevState, image: result.info.url };
        });
      }
    }
  );

  return (
    <div className={resourceform}>
      {!resource ? (
        <h2>Offer a new resource</h2>
      ) : (
        <h2>Update current Resource</h2>
      )}
    <form className={form} onSubmit={handleSave}>
      <label>
        * Title:
        <input
          name="title"
          type="text"
          placeholder="title"
          aria-label="title"
          value={formState.title}
          onChange={handleFormChange}
        />
      </label>

      {!formState.image ? (
        <button
          id="upload_widget"
          onClick={(e) => {
            e.preventDefault();
            myWidget.open();
          }}
        >
          Upload an Image
        </button>
      ) : (
        <>
          <img className={img} src={formState.image} />
        </>
      )}

      <label>
        * Type:
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
        * Description:
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

      {!formState.address && !markerCoords.lat ? (
        <label>
         * Address:
          <AddressSearch setFormState={setFormState} />
        </label>
      ) : (
        <p>{formState.address}</p>
      )}

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

      <p>* Required fields</p>

      {formError && <p>{formError}</p>}

      <button type="submit">Save</button>
    </form>
    </div>
  );
}
