import { useState } from 'react';

const PetForm = (props) => {
    const [FormData, setFormData] = useState({
        name:'',
        age:'',
        breed:'',
    });

    const handleChange = (event) => {
        setFormData({...FormData, [event.target.name]: event.target.value});
    };

    return (
    <div>
      <form>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={FormData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={FormData.age}
          onChange={handleChange}
          required
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={FormData.breed}
          onChange={handleChange}
        />
        <button type="submit">Add New Pet</button>
      </form>
    </div>
  );
};

export default PetForm;

