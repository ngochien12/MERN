import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link,useHistory} from 'react-router-dom'
import {useState,useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    // local state
    const [loginForm, setloginForm] = useState({
        username: '',
        password: ''
    })

    // Alert
    const [alert, setAlert] = useState(null)


    const {username,password} = loginForm

    const onChangeLoginForm = event => setloginForm({...loginForm,[event.target.name]: event.target.value})

    const {loginUser} = useContext(AuthContext)

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success){
            }else{
                setAlert({type: 'danger',message: loginData.message})
                setTimeout(() => setAlert(null),3000)

            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return(
    <>
     <Form className='my-4' onSubmit={login}>
     <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control
            type='text'
            placeholder='username' 
            name='username' 
            value={username}
            onChange={onChangeLoginForm}
            required />
        </Form.Group>
        <Form.Group>
            <Form.Control 
            type='password' 
            placeholder='password' 
            name='password' 
            value={password}
            onChange={onChangeLoginForm}
            required />
        </Form.Group>
        <Button 
        variant='success' 
        type='submit'>Login</Button>
    </Form>
    <p>Don't have an account?
        <Link to='/register'>
            <Button variant='info' size='sm' className='ml-2'>Register</Button>
        </Link> 
    </p>
    </>
    )
}

export default LoginForm
