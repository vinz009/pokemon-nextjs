import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage({ data }) {
  const [pokemon, setPokemon] = useState(data);

  const [details, setDetails] = useState("");

  const lists = pokemon.results.map((pokemon, index) => (
    <div
	  key={index}
      className="m-1 w-40 rounded-br-3xl  bg-[#FFFBC1] p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 md:w-56 lg:w-96 "
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
        setDetails({
          name: response.data.name,
          ability: response.data.abilities[0].ability.name,
          height: response.data.height,
          weight: response.data.weight,
          front: response.data.sprites.front_default,
          back: response.data.sprites.back_default,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleNext() {
    axios
      .get(pokemon.next)
      .then(function (response) {
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
        <img className="w-28 " src={details.front} alt="pokemon image front" />
      </div>
      <div className="w-28">
        <img className="w-28" src={details.back} alt="pokemon image back" />
      </div>
    </div>
  );
}

function Main({ details }) {
  return (
    <div className="mx-4 flex flex-col  rounded-tl-3xl bg-gradient-to-r from-[#FFAFBD] to-[#FFC3A0] py-2 text-center  lg:ml-4 lg:justify-center">
      <Image details={details} />
      <div className="">Name:&nbsp;&nbsp;&nbsp;{details.name} </div>
      <div className="">Ability:&nbsp;&nbsp;&nbsp;{details.ability} </div>
      <div className="">Height:&nbsp;&nbsp;&nbsp;{details.height} </div>
      <div className="">Weight:&nbsp;&nbsp;&nbsp;{details.weight} </div>
    </div>
  );
}

function SideBar({ lists, handleNext, handlePrevious }) {
  return (
    <div className="mx-4 rounded-br-3xl bg-gradient-to-r  from-[#FFAFBD] to-[#FFC3A0] pt-2 text-center lg:mr-4">
      <div className="m-2  ">Pokemon List</div>
      <div className="flex flex-wrap justify-center">{lists}</div>
      <div className="mt-2 flex justify-center">
        <div className="m-4 w-28 w-20 rounded-br-3xl  bg-[#FFFBC1] p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 md:w-56 lg:w-96">
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="m-4 w-28 w-20 rounded-br-3xl  bg-[#FFFBC1] p-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 md:w-56 lg:w-96">
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
