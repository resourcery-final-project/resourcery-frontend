export default function List({ list }) {
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <h4>{item.description}</h4>
            <p>{item.hours}</p>
            <p>{item.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
