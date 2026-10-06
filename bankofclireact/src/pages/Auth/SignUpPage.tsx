import { type ChangeEvent, type FormEvent, useState } from 'react'
import './SignUpPage.css'

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
    <main className="signup-page">
      <div className="signup-card">
        <section className="signup-hero">

          <div className="hero-star" aria-hidden="true">
            ★
          </div>

          <div className="hero-text">
            <p>You can easily</p>

            <h2>
              View account balance,
              <br />
              deposit, withdraw, transfer
              <br />
              money at any time.
            </h2>
          </div>

        </section>
        <section className="signup-content">

          <div className="signup-inner">

            <h1>Register Account</h1>

            <p className="signup-description">
              Get started with a new account. Fill in your
              details below to set up your secure dashboard.
            </p>

            <form
              className="signup-form"
              onSubmit={handleSubmit}
            >

              {/* ACCOUNT ID */}
              <div className="form-group">
                <label htmlFor="accountId">
                  Account ID
                </label>

                <input
                  id="accountId"
                  name="accountId"
                  type="text"
                  value={formData.accountId}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>

              {/* ACCOUNT PIN */}
              <div className="form-group">
                <label htmlFor="accountPin">
                  Account PIN
                </label>

                <div className="password-wrapper">

                  <input
                    id="accountPin"
                    name="accountPin"
                    type="password"
                    value={formData.accountPin}
                    onChange={handleChange}
                    placeholder=""
                  />

                  <button>
                    type="button"
                    className="password-toggle"
                    
              
                  </button>

                </div>
              </div>

              <button
                className="register-button"
                type="submit"
              >
                Register
              </button>

            </form>

            <div className="login-section">
              <span>
                Already have an account?
              </span>

              <a href="/login">
                Login
              </a>
            </div>

          </div>

        </section>
      </div>
      
    </main>
  )
}

export default SignUpPage
