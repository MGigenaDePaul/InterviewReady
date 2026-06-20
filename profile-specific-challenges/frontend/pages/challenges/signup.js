import { useState } from "react";


function API(data) {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          success: "Your Account has been successfully created!",
          error: "Username is taken",
        }),
      1000
    );
  });
}

export default function SignupForm() {
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const validate = () => {
    if (!newEmail.includes('@') || !newEmail.includes('.')) return false
    if (!(/[^a-zA-Z0-9]/.test(newPassword))) return false
    if (!(/[0-9]/.test(newPassword))) return false
    if (newPassword.length < 8) return false
    return true
  }

  const styles = {
      form: {
        display: 'grid',
        padding: '10px',
        width: '300px',
        margin: 'auto',
        marginTop: '300px',
        gap: '10px'
      },
      input: {
        padding: '5px',
        borderRadius: '8px',
        borderStyle: 'none',
        border: '2px solid #ccc'
      },
      button: {
        padding: '8px',
        backgroundColor: '#1c63a5',
        color: '#ffff',
        borderRadius: '8px',
        borderStyle: 'none',
      }

  }

  const handleSubmit = async (e) => {
      e.preventDefault()


      if (!validate()) {
        setMessage('Invalid email or password')
        return
      }

      const result = await API({email: newEmail, password: newPassword})

      if (result.error) {
        setMessage(result.error)
        return
      }

      setMessage(result.success)
  }

  return(
    <>
      <h1>
        Signup Form
      </h1>
      {/* <p>
        Build a user Signup form in React with the following features.

        1. An email and a password input
        2. Email must have an “@” and the domain side must include a “.”
        3. Password must include
            1.  at least one special character
            2. one number and be at least 8 characters
        4. Submission request handling  
           1. Utilze the mock API function to handle submissions
        5. Basic aesthetics with pure CSS
      </p> */}


      <form style={styles.form}onSubmit={handleSubmit} >
        <input style={styles.input} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Email" />
        <input style={styles.input} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Password"/>
        <button style={styles.button} type='submit'>Submit</button>
        {message}
      </form>
    </>
  )
}
