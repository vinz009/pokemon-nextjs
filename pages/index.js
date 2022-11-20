import axios from 'axios';
import { useState, useEffect } from 'react';

export default function HomePage({ data }) {
	
	const [pokemon, setPokemon] = useState(data);
	const [name, setName] = useState('');
	const [ability, setAbility] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const details = {
		name,
		ability,
		height,
		weight,	
	};


const lists = pokemon.results.map((pokemon) => (

	<div
onClick={handleClick}
	>
	<button >
	{pokemon.name}		
	</button>
	</div>
));

function handleClick (e) {
	const poke = e.target.textContent;
	axios.get('https://pokeapi.co/api/v2/pokemon/' + poke)
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
		  <Main details={details} />
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

function Main ({ details}) {
	return (
		<div>
		<div>Name:{details.name}  </div>
		<div>Ability:{details.ability} </div>
		<div>Height:{details.height} </div>
		<div>Weight:{details.weight} </div>

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

