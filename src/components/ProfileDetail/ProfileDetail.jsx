import { useHistory } from "react-router-dom"

export default function ProfileDetail() {
  const history = useHistory();

  return (
    <div>
      <h1>UserName</h1>
      <button onClick={() => {
        history.push('/create-resource')
      }}>add resource</button>
      <ul>
        <li>
          resource 1
        </li>
      </ul>
    </div>
  )
}
