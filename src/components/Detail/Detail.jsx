import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import styles from '../../App.module.css';

export default function Detail({ detail, handleDelete }) {
  const { user } = useUser();
  const history = useHistory();
  const { img, detailview } = styles;

  return (
    <div className={detailview}>
      <h1>{detail.title}</h1>
      {detail.image && (
        <img className={img} src={detail.image} alt={detail.description} />
      )}
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
