import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProfileDetail({ profileList }) {
  const history = useHistory();

  return (
    <div>
      <h1>UserName</h1>
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
              <Link to={`/rescource/${item.id}`}>{item.title}</Link>
            </h3>
            <h4>{item.description}</h4>
            <p>{item.hours}</p>
            <p>{item.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
