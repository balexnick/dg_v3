import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
// import Loader from '../../../components/Loader'
import './Login.scss'
import datagram from 'assets/datagram.png'
import {actions} from 'store'


const Login = ({loginAction, isFetching}) => {
  const [userInfo, setUserInfo] = useState({username: 'pascal@datagram.ai', password: 'Pscl%%17!!'})
  const [error, setError] = useState(false);

  const submitLogin = () => {
    loginAction('/login', userInfo.username, userInfo.password)
  }

  const handleChange = e => {
    setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
    });
  }

  return (
    <div className='login-container'>
      <Toolbar className='custom-style-header'>
        <div className='style-toolbar-group' style={{ marginLeft: '-12px' }}>
          <a href='https://www.datagram.ai/'><img src={datagram} alt='datagram'/></a>
          <h3>Datagram</h3>
        </div>
      </Toolbar>
      <Paper className='login-card'>
        <h2>Bienvenue sur Datagram</h2>
        <div>
          <TextField
            id='login-username-id'
            value={userInfo.username}
            name='username'
            placeholder='Email'
            onChange={handleChange}
            className='login-input'
          />
          <br />
          <TextField
            error={error}
            helperText={error ? 'Votre identifiant / mot de passe est incorrect' : ''}
            id='login-password-id'
            value={userInfo.password}
            name='password'
            type='password'
            placeholder='Mot de passe'
            onChange={handleChange}
            onKeyPress={(e) => { if (e.key === 'Enter') submitLogin() }}
            className='login-input'
          />
        </div>
        <Button variant='contained' color='primary' className='login-button'onClick={submitLogin} disabled={isFetching}  >
          Connexion
        </Button>
          {/* {this.props.isFetching ? <Loader
            requestId='/login'
            style={{ 'position': 'absolute', 'left': '165px', 'top': '105px', 'transform': 'initial' }}
            size={60}
            left={0}
            top={0}
            status='loading'
           /> : ''} */}
      </Paper>
    </div>
  )
}

const mapStateToProps = store => ({
  isFetching: store.auth.fetching
})

const mapDispatchToProps = dispatch => ({
  loginAction: (requestId, username, password) => dispatch(actions.auth.loginAction(requestId, username, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)

  // componentWillReceiveProps (nextProps) {
  //   if ((nextProps.isFetching !== this.props.isFetching) && this.props.isFetching && nextProps.error) {
  //     this.setState({ error: true })
  //   } else if ((nextProps.isFetching !== this.props.isFetching) && this.props.isFetching && !nextProps.error) {
  //     this.setState({ error: false })
  //   }
  // }

  

