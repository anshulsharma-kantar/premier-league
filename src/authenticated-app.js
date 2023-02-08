/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import { useAuth } from "context/auth-context"
import { Link as RouterLink, useMatch, useRoutes } from 'react-router-dom'
import ResponsiveAppBar from "context/navbar"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorMessage, FullPageErrorFallback } from 'components/lib'
import * as mq from 'styles/media-queries'

import Playerspage from "screens/player-page"
import Teampage from "screens/team-page"
import { NotFoundScreen } from 'screens/not-found';

import Container from '@mui/material/Container';


const RouteArray = [
    { 'name': 'Teams', 'link': '/teams', 'component': <Teampage /> },
    { 'name': 'Players', 'link': '/players', 'component': <Playerspage /> }
]

function ErrorFallback({ error }) {
    return (
        <ErrorMessage
            error={error}
            css={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        />
    )
}

function AuthenticatedApp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth()
    return (
        <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
            <ResponsiveAppBar userData={user}></ResponsiveAppBar>
            <div
                css={{
                    margin: '0 auto',
                    padding: '4em 2em',
                    // maxWidth: 'fit-content',
                    width: 'auto',
                    display: 'grid',
                    gridGap: '1em',
                    gridTemplateColumns: '1fr',
                    [mq.small]: {
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto',
                        width: '100%',
                    },
                }}
            >
                <Container fixed>
                    <main css={{ width: '100%' }}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <AppRoutes />
                        </ErrorBoundary>
                    </main>
                </Container>
            </div>
        </ErrorBoundary>

    )
}

function AppRoutes() {
    let routeList = [];
    for (let i = 0; i < RouteArray.length; i++) {
       routeList.push({ path: RouteArray[i].link, element: RouteArray[i].component })
    }
    routeList.push({ path: '*', element: <NotFoundScreen /> });
    let routes = useRoutes(routeList)
    return routes
 }

export default AuthenticatedApp