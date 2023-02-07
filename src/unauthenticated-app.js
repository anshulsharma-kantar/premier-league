/** @jsxImportSource @emotion/react */

import { useAuth } from 'context/auth-context';
import { GoogleLogin } from '@react-oauth/google';
import './styles/main.css'

function UnauthenticatedApp() {
   const { login } = useAuth()
   const loginHandler = (token) => {
      console.log(token);
      const payload = {
         idtoken: token.credential
      }
      login({ data: payload })
      // login('login')
   }
   return (
      <div
         css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
         }}
      >
         <div
            css={{
               display: 'grid',
               gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
               gridGap: '0.75rem',
            }}>
            <div className='login-wrapper'>
               <div className="avatar">
                  <img alt="Kantar Logo" src="images/Kantar-Group-Logo-PNG-White.png" />
               </div>
               <div className="avatar">
                  <img alt="Premier League Logo" src="images/premier-league.png" />
               </div>
               <h4 css={{
                  fontSize: 'clamp(1.44rem, calc(1.05rem + 1.95vw), 2.44rem)',
                  fontWeight: '500',
                  margin: '0 0 2rem'
               }}>Premier League</h4>
               <form className='login-form'>
                  <GoogleLogin
                     onSuccess={credentialResponse => {
                        loginHandler(credentialResponse)
                     }}
                     onError={() => {
                        console.log('Login Failed');
                     }}
                  />
               </form>
            </div>
         </div>
      </div>
   )
}

export default UnauthenticatedApp