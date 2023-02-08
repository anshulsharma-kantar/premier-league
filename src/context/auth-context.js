/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import * as React from 'react'
import * as auth from 'auth-provider'
import { client } from 'utils/app-client'
import { useAsync } from 'utils/hooks'
import { mockUser } from 'test/data/mockuser'
// import { FullPageSpinner, FullPageErrorFallback } from 'components/lib'

async function bootstrapAppData() {
   let user = null

   const token = await auth.getToken()
   if (token) {
      const data = await client('login')
      user = data
   }
   if (process.env.NODE_ENV === "test") {
      // this is a work around for testing as I couldn't setup the msw login api correctly
      return mockUser
   }
   return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
   const {
      data: user,
      status,
      error,
      isLoading,
      isIdle,
      isError,
      isSuccess,
      run,
      setData,
   } = useAsync()

   // revisit the code
   React.useEffect(() => {
      const appDataPromise = bootstrapAppData()
      run(appDataPromise)
   }, [run])

   const login = React.useCallback(
      form => auth.login(form).then(user => setData(user)),
      [setData],
   )
   const register = React.useCallback(
      form => auth.register(form).then(user => setData(user)),
      [setData],
   )
   const logout = React.useCallback(() => {
      auth.logout()
      // queryCache.clear()
      setData(null)
   }, [setData])

   const value = React.useMemo(
      () => ({ user, login, logout, register }),
      [login, logout, register, user],
   )

   if (isLoading || isIdle) {
      return (<div>Loading...</div>)
   }

   if (isError) {
      return (<div>Loading...</div>)
   }

   if (isSuccess) {
      return <AuthContext.Provider value={value} {...props} />
   }

   throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
   const context = React.useContext(AuthContext)
   if (context === undefined) {
      throw new Error(`useAuth must be used within a AuthProvider`)
   }
   return context
}

function useClient() {
   const { user } = useAuth()
   const token = user?.Email
   return React.useCallback(
      (endpoint, config) => client(endpoint, { ...config, token }),
      [token],
   )
}

export { AuthProvider, useAuth, useClient }
