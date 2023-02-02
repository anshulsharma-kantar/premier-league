/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';

// import { Logo } from './components/logo';
import { useAuth } from 'context/auth-context';
import { GoogleLogin } from '@react-oauth/google';

function UnauthenticatedApp() {
   const { login } = useAuth()
   const loginHandler = (token) => {
      console.log(token);
      const payload = {
         idtoken: token.credential
      }
      login({data: payload})
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
         {/* <Logo width="80" height="80" /> */}
         <h1>Premier League</h1>
         <div
            css={{
               display: 'grid',
               gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
               gridGap: '0.75rem',
            }}>
            <GoogleLogin
               onSuccess={credentialResponse => {
                  loginHandler(credentialResponse)
               }}
               onError={() => {
                  console.log('Login Failed');
               }}
            />
         </div>
      </div>
   )
}

export default UnauthenticatedApp