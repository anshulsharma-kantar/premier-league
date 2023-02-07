import * as colors from '../styles/colors';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FaSpinner } from 'react-icons/fa';


const errorMessageVariants = {
    stacked: { display: 'block' },
    inline: { display: 'inline-block' },
}

const Link = styled(RouterLink)({
    color: colors.indigo,
    ':hover': {
        color: colors.indigoDarken10,
        textDecoration: 'underline',
    },
})

const spin = keyframes({ '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' }, }) 

const Spinner = styled(FaSpinner)({ animation: `${spin} 1s linear infinite`, })

Spinner.defaultProps = { 'aria-label': 'loading', }

function ErrorMessage({ error, variant = 'stacked', ...props }) {
    return (
        <div
            role="alert"
            css={[{ color: colors.danger }, errorMessageVariants[variant]]}
            {...props}
        >
            <span>There was an error: </span>
            <pre
                css={[
                    { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
                    errorMessageVariants[variant],
                ]}
            >
                {error.message}
            </pre>
        </div>
    )
}

function FullPageErrorFallback({ error }) {
    return (
        <div
            role="alert"
            css={{
                color: colors.danger,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>Uh oh... There's a problem. Try refreshing the app.</p>
            <pre>{error.message}</pre>
        </div>
    )
}

export {
    FullPageErrorFallback,
    ErrorMessage,
    Link,
    Spinner
}