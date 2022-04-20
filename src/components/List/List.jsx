import { Link } from 'react-router-dom';

export default function List({ list }) {
  return (
    <div>
      <ul>
        {list.map((item) => (
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
