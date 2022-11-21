import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage({ data }) {
  const [pokemon, setPokemon] = useState(data);
  const [name, setName] = useState("");
  const [ability, setAbility] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const details = {
    name,
    ability,
    height,
    weight,
    front,
    back,
  };

  const lists = pokemon.results.map((pokemon) => (
    <div
      className="m-1 w-40 rounded-full border-2 border-black bg-green-300 p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 md:w-56 lg:w-96 "
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
        setFront(response.data.sprites.front_default);
        setBack(response.data.sprites.back_default);
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
      <div className="grid lg:grid-cols-2">
        <Main details={details} />
        <SideBar
          lists={lists}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </div>
    </Container>
  );
}

function Container({ children }) {
  return (
    <div className="font-montagu text-xl md:text-3xl lg:text-5xl">
      {children}
    </div>
  );
}

function Header() {
  return (
    <h1 className="mt-8 animate-bounce text-center text-4xl font-bold underline md:text-6xl lg:text-8xl">
      Pokedex
    </h1>
  );
}

function Image({ details }) {
  if (!details.front) {
    return null;
  }
  return (
    <div className="flex flex-row justify-center ">
      <div className="mx-2">
        <img
          className="w-28 border-2 border-black"
          src={details.front}
          alt={"image"}
        />
      </div>
      <div className="w-28">
        <img className="w-28" src={details.back} alt={"image"} />
      </div>
    </div>
  );
}

function Main({ details }) {
  return (
    <div className="mt-6 flex flex-col border-2 border-black text-center lg:justify-center">
      <Image details={details} />
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
      <div className="flex flex-wrap justify-center">{lists}</div>
      <div className="mt-2 flex justify-center">
        <div className="m-4 w-28 w-20 rounded-full border-2 border-black bg-green-300 p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 md:w-56 lg:w-96">
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="m-4 w-28 w-20 rounded-full border-2 border-black bg-green-300 p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 md:w-56 lg:w-96">
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
