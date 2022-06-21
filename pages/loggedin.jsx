import { useEffect, useState } from "react"
import { useRouter } from "next/router";
export default function LoggedIn({ auth, setAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setloggedin] = useState('not');
    const router = useRouter();


    const handleInputChange = e => {
        const { value, name } = e.target;
        if (name === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/login', {
          method: 'POST',
          withCredentials: true,
          body: JSON.stringify({
            username: email,
            password: password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 200) {
            const j = res.json()
            return j
          } else {
            console.log(res.error)
            const error = new Error(res.error);
            throw error;
          }
        }).then(j => {
          setAuth(
            {
              email: j.username,
              auth: true
            }
          )
          router.push(`/creator/${j.username}`)
        })
        .catch(err => {
          alert('Error logging in please try again');
        });
      }
      const checkLog = async () => {
        const response = await fetch('/api/checkToken');
        if (response.status === 200) {
          setloggedin('loggedin')
        } else {
          setloggedin('failed')
        }
      }
    const onLogout = async () => {
      const response = await fetch('/api/logout')
      if(response.status === 200) {
        setAuth({
          email: 'NONE',
          auth: false
        })
      } else {
        alert('Error logging out')
      }
    }
    return (
      <>
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <input
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <input type="submit" value="Submit"/>
          </form>
        <button onClick={checkLog}>Check</button>
        <button onClick={onLogout}>logout</button>
        <br/>
      {
        loggedin
      }
      {
        auth.auth.toString()
      }
      {
        auth.email ? auth.email :  ''
      }
      </>
    )
}