import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

export default function AddressSearch({ setFormState }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 45.51223,
        lng: () => -122.658722,
      },
      radius: 200 * 1000,
    },
  });

  const handleAddressChange = async (address) => {};

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setFormState((prevState) => {
              return { ...prevState, latitude: lat, longitude: lng, address };
            });
          } catch (error) {
            throw(error);
          }
          setValue(address);
        }}
      >
        <ComboboxInput
          name="address"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="enter an address"
        ></ComboboxInput>
        <ComboboxPopover>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id + description} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
