import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Detail({ detail, handleDelete }) {
  const { user } = useUser();
  const history = useHistory();

  return (
    <div>
      <h1>{detail.title}</h1>
      {detail.image && <img src={detail.image} alt={detail.description} />}
      <h3>{detail.description}</h3>
      <p>{detail.hours}</p>
      <p>{detail.phone}</p>
      {user.id === detail.userId && (
        <>
          <button onClick={() => history.push(`/update-resource/${detail.id}`)}>
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(detail.id);
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
