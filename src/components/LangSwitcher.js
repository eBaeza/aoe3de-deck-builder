import React from 'react'
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { translate } from '../utils/translator';

export const LangSwitcher = ({ langEsp, onChangeLang }) => {
    const baseIcoPath = '/resources/images/icons/flags/Flag_'
    const icoSizeSx = { width: 24, height: 24 }
    const handleSwitchEsp = (event) => {
        onChangeLang(event)
    }

    return (
        <Stack direction="row" alignItems="center" mr={1}>
            <Avatar
                sx={icoSizeSx}
                alt="English"
                src={`${baseIcoPath}British.png`} />

            <FormControlLabel
                control={<Switch color='warning' checked={langEsp} onChange={handleSwitchEsp} />}
                label={translate('70880')}
                labelPlacement="top"
                sx={{ 
                    m: 0, mt: '-17px', 
                    '.MuiFormControlLabel-label': { position: 'relative', top: 6, fontSize: 11, textTransform: 'uppercase' } 
                }}
            />

            <Avatar
                sx={icoSizeSx}
                alt="Español"
                src={`${baseIcoPath}Spanish.png`} />
        </Stack>
    )
}
