import { useState } from 'react';
import styled from '@emotion/styled';

const FormContainer = styled.form`
  padding: 16px;
  background-color: #121212;
  border-radius: 8px;
  color: #E0E0E0;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  width: 100%;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3a3a3a;
  color: #E0E0E0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8E8E8E;
  }
`;

function HabitForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onSubmit({ name });
      setName('');
    } else {
      alert("Please provide a habit name");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Add a New Habit</h2>
      <FormGroup>
        <Label htmlFor="habit-name">Habit Name:</Label>
        <Input
          type="text"
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          required
        />
      </FormGroup>
      <Button type="submit">Save Habit</Button>
    </FormContainer>
  );
}

export default HabitForm;
