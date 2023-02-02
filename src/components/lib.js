import * as colors from '../styles/colors';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled/macro';


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
    Link
}