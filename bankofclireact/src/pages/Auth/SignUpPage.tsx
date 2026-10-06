import { type ChangeEvent, type FormEvent, useState } from 'react'

type SignUpFormData = {
  accountId: string
  accountPin: string
}

const initialFormData: SignUpFormData = {
  accountId: '',
  accountPin: '',
}

function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const fieldName = event.target.name as keyof SignUpFormData
    const { value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log('Register account:', formData)
  }

  return (
    <div>
      <h1>Register Account</h1>
      <p>Get started with a new account. Fill in your details below to set up your secure dashboard.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="accountId">
            <h2>Account ID</h2>
          </label>
          <input
            id="accountId"
            name="accountId"
            type="text"
            value={formData.accountId}
            onChange={handleChange}
            placeholder="Enter your Account ID"
          />
        </div>

        <div>
          <label htmlFor="accountPin">
            <h2>Account PIN</h2>
          </label>
          <input
            id="accountPin"
            name="accountPin"
            type="password"
            value={formData.accountPin}
            onChange={handleChange}
            placeholder="Enter your Account PIN"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  )
}

export default SignUpPage
