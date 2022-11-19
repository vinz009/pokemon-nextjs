import axios from 'axios';

export default function HomePage({ data }) {

  return (
	  <Container>
		  <Header />
		  <Main  />
		  <SideBar data={data} />
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

function SideBar ({data}) {
	return (
		<div>
		Count: {data.count}
		</div>
	);
}

export async function getStaticProps () {
	const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0');
	  return { 
	 
		  props:  { data },
	  }

}

