

export default function HomePage() {
  return (
	  <Container>
		  <Header />
		  <Main />
		  <SideBar />
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

function Main () {
	return (
		<h1>
		asdflksdfh
		</h1>
	);
}

function SideBar () {
	return (
		<h1>
		this is sidebar
		</h1>
	);
}
