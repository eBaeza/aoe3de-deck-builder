import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import GithubIcon from '@mui/icons-material/GitHub'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material';
import { CivSelector } from "./CivSelector";
import { MobileMenu } from "./MobileMenu";

export const Header = React.memo(({ civs, onSelectCiv }) => {
    const theme = useTheme()
    const [langEsp, setLangEsp] = useState(() => {
        const langEsp = JSON.parse(localStorage.getItem('langEsp'))
        if (langEsp === null) return true
        return langEsp
    })

    const handleSelectCiv = useCallback((event) => {
        onSelectCiv(event)
    }, [])

    const handleSwitchEsp = (event) => {
        const value = event.target.checked
        setLangEsp(event.target.checked);
        localStorage.setItem('langEsp', JSON.stringify(value));
        window.location.reload()
    }

    const AppBar = styled(AppBarMui)({
        backgroundImage: 'linear-gradient(90deg,#181c29,#394766 40%,#181c29)',
        borderBottom: '1px solid #EBC837',
    })

    const goToGithub = () => {
        const url = 'https://github.com/eBaeza/aoe3de-deck-builder'
        window.open(url, '_blank').focus();
    }

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <img className='aoe3de-logo' src='/resources/aoe3_de_logo.png' alt="logo aoe3de"></img>
                    </Box>

                    <Box sx={{ py: 1, flexGrow: 1 }}>
                        <CivSelector civs={civs} onSelectCiv={handleSelectCiv} />
                    </Box>

                    <Box edge="end" sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}>
                        <FormControlLabel
                            label={langEsp ? 'en' : 'es'}
                            control={<Switch color='warning' checked={langEsp} onChange={handleSwitchEsp} />}
                        />

                        <IconButton size="large" onClick={goToGithub} color="inherit">
                            <GithubIcon />
                        </IconButton>
                    </Box>

                    <MobileMenu edge="end" langEsp={langEsp} onChangeLang={handleSwitchEsp}></MobileMenu>
                </Toolbar>
            </Container>
        </AppBar>
    )
})