import { useState } from 'react';
import {
  Container,
  Typography,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function AddDetails() {
  const Submit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post('http://localhost:5000/api/student-performance', {
        rno: formData.rno,
        name: formData.name,
        email: formData.email,
        branch: formData.branch,
        gpa: formData.gpa,
        cc: formData.cc,
        ec:
          formData.ec === 'None'
            ? '0'
            : formData.ec === 'Club Member'
            ? '4'
            : formData.ec === 'Volunteer'
            ? '7'
            : formData.ec === 'Board Member'
            ? '10'
            : '',
        bl: formData.bl,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const [formData, setFormData] = useState({
    rno: '',
    name: '',
    email: '',
    branch: '',
    gpa: '',
    cc: '',
    ec: '',
    bl: '',
  });
  const arr = {
    None: 0,
    'Club Member': 4,
    Volunteer: 7,
    'Board Member': 10,
  };

  return (
    <>
      <title> Add Student Details</title>
      <Container>
        <Typography
          letterSpacing={1}
          wordSpacing={2}
          variant="h3"
          style={{ justifyContent: 'center', display: 'flex', fontFamily: 'sans-serif' }}
        >
          Student Details Form
        </Typography>
        <br />
        <br />

        <Stack spacing={3} display="flex">
          <TextField
            name="rno"
            label="Roll Number"
            value={formData.rno}
            onChange={(e) => setFormData({ rno: e.target.value })}
          />
          <TextField name="name" label="Student Name" value={formData.name} onChange={handleChange} />
          <TextField name="email" label="Email Address" value={formData.email} onChange={handleChange} />
          <TextField name="branch" label="Branch" value={formData.branch} onChange={handleChange} />
          <TextField name="gpa" label=" Cummulative Grade Point Average" value={formData.gpa} onChange={handleChange} />
          <TextField name="cc" label="Co-Curricular Activities Participated" value={formData.cc} onChange={handleChange} />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Club Activities</InputLabel>
            <Select
              name="ec"
              labelId="demo-simple-select-helper-label"
              value={formData.ec}
              onChange={handleChange}
              id="demo-simple-select-helper"
              label="Extra-Curricular"
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Board Member">Board Member</MenuItem>
              <MenuItem value="Volunteer">Volunteer</MenuItem>
              <MenuItem value="Club Member">Club Member</MenuItem>
            </Select>
          </FormControl>
          <TextField name="bl" label="No of Backlogs" value={formData.bl} onChange={handleChange} />
          <br />
          <br />
        </Stack>
        <LoadingButton fullWidth size="large" onClick={Submit} variant="contained">
          Submit
        </LoadingButton>
      </Container>
    </>
  );
}
