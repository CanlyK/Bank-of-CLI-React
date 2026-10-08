import { type ChangeEvent, type FormEvent, useState } from 'react'
import './SignUpPage.css'
import toast from 'react-hot-toast';

type SignUpFormData = {
  username: string
  accountId: string
  accountPin: string
}

const initialFormData: SignUpFormData = {
  username: '',
  accountId: '',
  accountPin: '',
}

function SignUpPage() {
  const [formData, setFormData] =
    useState<SignUpFormData>(initialFormData)

  const [showPin, setShowPin] = useState(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const fieldName =
      event.target.name as keyof SignUpFormData

    const { value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    console.log('Register account:', formData)
  }

  return (
    <main className="signup-page">
      <div className="signup-card">

        {/* LEFT SIDE */}
        <section className="signup-hero component-card">

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
        <section className="signup-content component-card">

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
              {/* USERNAME */}
              <div className="form-group">
                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
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
                    type={showPin ? 'text' : 'password'}
                    value={formData.accountPin}
                    onChange={handleChange}
                    placeholder=""
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
                      // Eye with slash
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
                          d="M10.5 10.5a2 2 0 0 0 3 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M6.7 6.7C4.6 8.2 3.2 10.1 2 12c2.3 3.8 5.7 7 10 7 1.6 0 3.1-.4 4.4-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.9 5.2c.7-.2 1.4-.2 2.1-.2 4.3 0 7.7 3.2 10 7-0.7 1.2-1.5 2.3-2.4 3.2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      // Eye
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
                onClick={() => {
                  toast.success('Account registered successfully!');
                }}
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