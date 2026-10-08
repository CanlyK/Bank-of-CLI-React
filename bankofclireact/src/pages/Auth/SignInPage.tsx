import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './SignUpPage.css'
import { getAccountById } from '../../data/accountRepository'

type SignInFormData = {
  accountId: string
  accountPin: string
}

const initialFormData: SignInFormData = {
  accountId: '',
  accountPin: '',
}

function SignInPage() {
   const navigate = useNavigate();
  const [formData, setFormData] =
    useState<SignInFormData>(initialFormData)

  const [showPin, setShowPin] = useState(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const fieldName =
      event.target.name as keyof SignInFormData

    const { value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    navigate('/dashboard', { 
      state: getAccountById(Number(formData.accountId))
    });
  }

  return (
    <main className="signup-page">
      <div className="componentCard signup-card">

        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <section className="signup-content">
          <div className="signup-inner">

            <h1>Account Login</h1>

            <p className="signup-description">
              Welcome back! Please enter your credentials
              to access your secure dashboard.
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
                    type={showPin ? 'text' : 'password'}
                    value={formData.accountPin}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPin((current) => !current)
                    }
                    aria-label={
                      showPin
                        ? 'Hide account PIN'
                        : 'Show account PIN'
                    }
                  >
                    {showPin ? (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 3l18 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M6.7 6.7C4.6 8.2 3.2 10.1 2 12c2.3 3.8 5.7 7 10 7 1.6 0 3.1-.4 4.4-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M9.9 5.2c.7-.2 1.4-.2 2.1-.2 4.3 0 7.7 3.2 10 7-.7 1.2-1.5 2.3-2.4 3.2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>

                </div>
              </div>

              <button
                className="register-button"
                type="submit"
              >
                Login
              </button>

            </form>

            <div className="login-section">
              <span>Don't have an account?</span>

              <Link to="/register">
                Register
              </Link>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}

export default SignInPage