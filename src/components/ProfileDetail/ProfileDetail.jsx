import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function ProfileDetail({ profileList }) {
  const history = useHistory();
  const { user } = useUser();

  return (
    <div>
      <h1>{user.username}</h1>
      <button
        onClick={() => {
          history.push('/create-resource');
        }}
      >
        add resource
      </button>

      <ul>
        {profileList.map((item) => (
          <li key={item.id}>
            {item.image && <img src={item.image} alt={item.title} />}
            <h3>
              <Link to={`/resource/${item.id}`}>{item.title}</Link>
            </h3>
            <h4>{item.description}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}
