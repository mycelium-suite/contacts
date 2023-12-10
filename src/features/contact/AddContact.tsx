import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function AddContact() {

    const navigate = useNavigate();

    const [age, setAge] = useState<string>('10');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Container>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    //label="Type"
                    defaultValue="Person"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Person</MenuItem>
                    <MenuItem value={20}>Organization</MenuItem>
                </Select>
            </FormControl>

            <Stack spacing={4}>
                <TextField 
                    id="standard-basic" 
                    label="WebID" 
                    variant="standard" 
                />
                <TextField 
                    id="standard-basic" 
                    label="Name" 
                    variant="standard" 
                />
                <TextField 
                    id="standard-basic" 
                    label="Telephone" 
                    variant="standard" 
                />

                <FormControlLabel control={<Checkbox />} label="Advertise on my public profile (foaf:knows)" />

                <Stack spacing={2} direction="row">
                    <Button variant="contained">Save</Button>
                    <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
                </Stack>
            </Stack>
        </Container>
    )
}