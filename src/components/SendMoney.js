import { useState } from 'react';
import {TextField, Button, Alert, InputLabel, MenuItem, Select} from '@mui/material'
import Box from '@mui/material/Box';

const SendMoney = ({ onSendMoney }) => {
    const [messageSent, setMessageSent] = useState(false)
    const [recipientIdValue, setRecipientIdValue] = useState("")
    const [amountValue, setAmountValue] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault();    
        onSendMoney(parseInt(recipientIdValue), parseFloat(amountValue))

        setMessageSent(true)
        setRecipientIdValue("")
        setAmountValue("")
    };

    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
            required
            id="outlined-number-required"
            label="Amount"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            />
            <TextField
            required
            id="outlined-required"
            label="Recipient ID"
            value={recipientIdValue}
            onChange={(e) => setRecipientIdValue(e.target.value)}
            />
            <Button onClick={handleSubmit} variant="contained">Send Money</Button>

            {messageSent && <Alert severity="success">Money sent successfully!</Alert>}
      </Box>

    )
}

export default SendMoney