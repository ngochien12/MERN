import React,{useContext,useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage.js'

const RegisterForm = () => {
    // local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    // Alert
    const [alert, setAlert] = useState(null)


    const {username,password,confirmPassword} = registerForm

    const onChangeRegisterForm = event => setRegisterForm({...registerForm,[event.target.name]: event.target.value})

    const {registerUser} = useContext(AuthContext)

    const register = async event => {
        event.preventDefault()

        if(password !== confirmPassword){
            setAlert({type: 'danger',message: 'Passwords do not match'})
            setTimeout(() => setAlert(null),3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success){
                setAlert({type: 'danger',message: registerData.message})
                setTimeout(() => setAlert(null),3000)
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return(
    <>
     <Form className='my-4' onSubmit={register}>
     <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control 
            type='text' 
            laceholder='username' 
            name='username' 
            value={username}
            onChange={onChangeRegisterForm}
            required />
        </Form.Group>
        <Form.Group>
            <Form.Control 
            type='password' 
            placeholder='password' 
            name='password' 
            value={password}
            onChange={onChangeRegisterForm}
            required />
        </Form.Group>
        <Form.Group>
            <Form.Control 
            type='password' 
            placeholder='Confirm Password' 
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChangeRegisterForm} 
            required />
        </Form.Group>
        <Button variant='success' type='submit'>Register</Button>
    </Form>
    <p>
        Already have an account?
        <Link to='/login'>
            <Button variant='info' size='sm' className='ml-2'>Login</Button>
        </Link> 
    </p>
    </>
    )
}

export default RegisterForm
