import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage({ data }) {
  const [pokemon, setPokemon] = useState(data);
  const [name, setName] = useState("");
  const [ability, setAbility] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const details = {
    name,
    ability,
    height,
    weight,
  };

  const lists = pokemon.results.map((pokemon) => (
    <div className="m-1 bg-green-300 hover:bg-green-600 rounded-full w-40 p-2  border-2 border-black " 
	  onClick={handleClick}>
      <button>{pokemon.name}</button>
    </div>
  ));

  function handleClick(e) {
    const poke = e.target.textContent;
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + poke)
      .then(function (response) {
        console.log(response.data);
        setName(response.data.name);
        setAbility(response.data.abilities[0].ability.name);
        setHeight(response.data.height);
        setWeight(response.data.weight);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleNext() {
    axios
      .get(pokemon.next)
      .then(function (response) {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handlePrevious() {
    axios
      .get(pokemon.previous)
      .then(function (response) {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Container>
      <Header />
      <Main details={details} />
      <SideBar
        lists={lists}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </Container>
  );
}

function Container({ children }) {
  return (
	  <div className="text-xl font-montagu">
	  {children}
	  </div>
  );
}

function Header() {
  return <h1 className="text-4xl font-bold underline mt-8 text-center">Pokedex</h1>;
}

function Main({ details }) {
  return (
    <div className="flex flex-col border-2 border-black text-center mt-6">
      <div className="border-2 border-black ">Name:&nbsp;&nbsp;&nbsp;{details.name} </div>
      <div className="border-2 border-black ">Ability:&nbsp;&nbsp;&nbsp;{details.ability} </div>
      <div className="border-2 border-black ">Height:&nbsp;&nbsp;&nbsp;{details.height} </div>
      <div className="border-2 border-black ">Weight:&nbsp;&nbsp;&nbsp;{details.weight} </div>
    </div>
  );
}

function SideBar({ lists, handleNext, handlePrevious }) {
  return (
	<div className="text-center mt-6">
	  <div className="m-2">Pokemon List</div>
      <div className="flex flex-wrap justify-center items-center">{lists}</div>
      <div className="flex justify-center">
	  	<div className="border-2 border-black m-4" >
        <button onClick={handleNext}>Next</button>
		  </div>
	  	<div className="border-2 border-black m-4" >
        <button onClick={handlePrevious}>Previous</button>
		  </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
  );

  return {
    props: { data },
  };
}
