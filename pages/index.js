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
    <div
      className="m-1 w-40 rounded-full border-2 border-black bg-green-300 p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 "
      onClick={handleClick}
    >
      <button>{pokemon.name}</button>
    </div>
  ));

  function handleClick(e) {
    const poke = e.target.textContent;
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + poke)
      .then(function (response) {
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
  return <div className="font-montagu text-xl">{children}</div>;
}

function Header() {
  return (
    <h1 className="mt-8 animate-bounce text-center text-4xl font-bold underline">
      Pokedex
    </h1>
  );
}

function Main({ details }) {
  return (
    <div className="mt-6 flex flex-col border-2 border-black text-center">
      <div className="border-2 border-black ">
        Name:&nbsp;&nbsp;&nbsp;{details.name}{" "}
      </div>
      <div className="border-2 border-black ">
        Ability:&nbsp;&nbsp;&nbsp;{details.ability}{" "}
      </div>
      <div className="border-2 border-black ">
        Height:&nbsp;&nbsp;&nbsp;{details.height}{" "}
      </div>
      <div className="border-2 border-black ">
        Weight:&nbsp;&nbsp;&nbsp;{details.weight}{" "}
      </div>
    </div>
  );
}

function SideBar({ lists, handleNext, handlePrevious }) {
  return (
    <div className="mt-4 text-center">
      <div className="m-2 bg-green-300 hover:drop-shadow-xl">Pokemon List</div>
      <div className="grid grid-cols-2 justify-items-center ">{lists}</div>
      <div className="mt-2 flex justify-center">
        <div className="m-4 w-28 w-20 rounded-full border-2 border-black bg-green-300 p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500">
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="m-4 w-28 w-20 rounded-full border-2 border-black bg-green-300 p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500">
          <button onClick={handlePrevious}>Prev</button>
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
