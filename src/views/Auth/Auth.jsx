import { useState } from "react"
import { useForm } from "../../hooks/useForm"

export default function Auth() {
    const [error, setError] = useState();
    const { formState, handleFormChange } = useForm({username: '', password: ''});
    const 

  return (
    <div>Auth</div>
  )
}

