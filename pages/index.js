import axios from 'axios';

export default function HomePage({ data }) {
	console.log(data);

const lists = data.results.map((pokemon) => (
	<div>
	Name: {pokemon.name}		
	</div>
));

  return (
	  <Container>
		  <Header />
		  <Main  />
		  <SideBar lists={lists} />
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

function SideBar ({lists}) {
	return (
		<div>
		{lists}
		</div>
	);
}

export async function getStaticProps () {
	const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0');
	  return { 
	 
		  props:  { data },
	  }

}

