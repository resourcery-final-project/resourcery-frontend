import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import styles from '../../App.module.css';

export default function ProfileDetail({ profileList }) {
  const history = useHistory();
  const { user } = useUser();
  const { profilelist, img, profileview, link } = styles;

  return (
    <div className={profileview}>
      <h1>{user.username}</h1>
      <button
        onClick={() => {
          history.push('/create-resource');
        }}
      >
        Add New Resource
      </button>

      {profileList[0] ? (
        <ul className={profilelist}>
          {profileList.map((item) => (
            <><li key={item.id}>
              {item.image && (
                <img className={img} src={item.image} alt={item.title} />
              )}
              <h3>
                <Link className={link} to={`/resource/${item.id}`}>{item.title}</Link>
              </h3>
              <h4>{item.description}</h4>
            </li><hr /></>
          ))}
        </ul>
      ) : (
        <p>You have not added any resources yet.</p>
      )}
    </div>
  );
}
