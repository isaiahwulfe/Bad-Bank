function Home(){
  return (
    <TripleFrame
      center={
        <Card
          bgcolor="dark"
          header="BadBank"
          title="Welcome to the Bad Bank"
          text="You can move around using the navigation bar."
          body={(<img src="bank.png" style={{position: "relative", width:"15rem", height:"auto", left: "50%", transform: "translate(-50%)"}} alt="Responsive image"/>)}
        />
      }
    />
  );  
}
