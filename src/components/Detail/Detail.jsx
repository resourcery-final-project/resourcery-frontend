export default function Detail({ detail }) {
  console.log(detail);
  console.log('hello', hello);
  return (
    <div>
      {detail.title}
      <p>hello</p>
    </div>
  );
}
