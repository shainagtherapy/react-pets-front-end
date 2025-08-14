import { useState, useEffect } from 'react';
import * as petService from './services/petService';

import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  

  useEffect(() => {
  const fetchPets = async () => {
    try {
      const fetchedPets = await petService.index();
    
      if (fetchedPets.err) {
        throw new Error(fetchedPets.err);
      }

      setPets(fetchedPets);
    } catch (err) {
      console.log(err)
    }
  }
  fetchPets();
}, []);

  const handleSelect = (pet) => {
    setSelected(pet)
  };
  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  }

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      setPets([newPet, ...pets])
      setIsFormOpen(false);
    } catch (err) {
      console.log(err)
    }
  };

  const handleUpdatePet= async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId)
      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) => (
        pet._id !== updatedPet._id ? pet : updatedPet
      ));
      console.log(updatedPetList);
      setPets(updatedPetList)
      setSelected(updatedPet);
      setIsFormOpen(false);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <PetList pets={pets} handleSelect={handleSelect} 
    handleFormView={handleFormView} isFormOpen={isFormOpen} /> 
    {isFormOpen ? ( <PetForm handleAddPet={handleAddPet} selected={selected} handleUpdatePet={handleUpdatePet} /> 
    ) : ( 
      <PetDetail selected={selected} handleFormView={handleFormView}/> )}
    </>
  );
};

export default App;
