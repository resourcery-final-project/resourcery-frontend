import { Link } from 'react-router-dom';
import styles from '../../App.module.css'

export default function List({ list }) {
  const { link } = styles;
  return (
    <div>
      <ul>
        {list.map((item) => (
          <><li key={item.id}>
            {item.image && <img src={item.image} alt={item.title} />}
            <h3>
              <Link className={link} to={`/resource/${item.id}`}>{item.title}</Link>
            </h3>
            <h4>{item.description}</h4>
          </li>
          <hr /></>
        ))}
      </ul>
    </div>
  );
}
