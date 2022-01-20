function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  
    
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <TripleFrame 
      center={
        <Card
          bgcolor="dark"
          header="Create Account"
          status={status}
          body={show ? (  
                  <div>
                    <Form
                      show={{name:true,email:true,password:true,amount:false}} 
                      name={name}
                      email={email}
                      password={password}
                      setName={setName}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      setShow={setShow}
                      task="Create Account"
                    />
                  </div>
                ):(
                  <div style={{textAlign:"center"}}>
                    <h4 style={{paddingBottom:".75rem"}}>Success!</h4>
                    <button style={{borderRadius:"6px"}} type="submit" className="my-button" onClick={clearForm}>Add another account</button>
                  </div>
                )}
        />
      }
    />
  )
}