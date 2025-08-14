import { useState } from 'react';

const PetForm = (props) => {
    const initialState = {
        name:'',
        age:'',
        breed:'',
    }
    const [FormData, setFormData] = useState(
        props.selected ? props.selected : initialState
    );

    const handleChange = (event) => {
        setFormData({...FormData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.selected) {
            props.handleUpdatePet(FormData, props.selected._id);
        } else {
        props.handleAddPet(FormData);
        }



    }
    return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
      </form>
    </div>
    );
    };


export default PetForm;

