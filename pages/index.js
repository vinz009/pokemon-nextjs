import axios from 'axios';
import { useState } from 'react';

export default function HomePage({ data }) {
	
	const [pokemon, setPokemon] = useState(data);

const lists = pokemon.results.map((pokemon) => (
	<div>
	Name: {pokemon.name}		
	</div>
));

function handleNext () {

	axios.get(pokemon.next)
	.then(function (response) {
		console.log(response.data);
		setPokemon(response.data);
	})
	.catch(function (error) {
		console.log(error);
	});
}


function handlePrevious () {

	axios.get(pokemon.previous)
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
		  <Main  />
		  <SideBar lists={lists} handleNext={handleNext} handlePrevious={handlePrevious} />
	  </Container>
  );
}

function Container ( {children} ) {
	return (
		<div>
		{children}
		</div>
	); 
}

function Header () {
	return ( 
	  <h1 className="text-4xl font-bold underline">
		Pokedex
	  </h1>
	);
}

function Main ( ) {
	return (
		<div>
		<div>Name:  </div>
		<div>Type: </div>
		<div>Ability: </div>
		<div>Height: </div>
		<div>Weight: </div>

		</div>
	);
}

function SideBar ({lists, handleNext, handlePrevious}) {
	return (
		<>
		<div>
		{lists}
		</div>
		<div>
		<button onClick={handleNext} >
		Next
		</button>
		<button onClick={handlePrevious} >
		Previous
		</button>
		</div>
		</>
	);
}

export async function getStaticProps () {
	const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0');
	  return { 
	 
		  props:  { data },
	  }

}

