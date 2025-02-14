import { useEffect, useState } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          name="location"
          id="location"
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="animal">Animal</label>
        <select
          name="animal"
          id="animal"
          type="text"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option></option>
          {ANIMALS.map((animal) => (
            <option value={animal}>{animal}</option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select
          name="breed"
          id="breed"
          type="text"
          value={breed}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          disabled={breeds.length === 0}
        >
          <option></option>
          {breeds.map((breed) => (
            <option value={breed}>{breed}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
