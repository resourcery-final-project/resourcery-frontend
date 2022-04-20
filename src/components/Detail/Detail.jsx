export default function Detail({ detail }) {
  return (
    <div>
      <h1>{detail.title}</h1>
      {/* {detail.image &&  */}
      <img src={detail.image} alt={detail.description} />
       {/* } */}
      <h3>{detail.description}</h3>
      <p>{detail.hours}</p>
      <p>{detail.phone}</p>
    </div>
  );
}
