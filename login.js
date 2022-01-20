function Login(){
  const [userInput, setUserInput] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState('');
  const [emailAttempt, setEmailAttempt] = React.useState('');
  const [passAttempt, setPassAttempt] = React.useState('');
  const [timer, setTimer] = React.useState(3);
  const ctx = React.useContext(UserContext);

  function redirect(){
    window.location.href="#/balance/"
  }

  function countdown(){
    if(timer > 0){
      setTimer(timer - 1);
    }
  }

  function getError(one, two){
    if(one < 0 && two >= 0){
      setError('email');
    }
    if(one >= 0 && two < 0){
      setError('password');
    }
    if(one < 0 && two < 0){
      setError('both');
    }
  }

  function success(){
    ctx.userInfo.loggedIn = true;
    console.log('success');
    console.log(ctx.userInfo.loggedIn);
    setTimeout(() => countdown(), 1000);
    setTimeout(() => {
      redirect();
    }, 3000);
    return(
      <div style={{textAlign:"center"}}>
        <h4>Success!</h4>
        <p>You are now logged in. You will be redirected in {timer} seconds.</p>
      </div>
    )
  }

  function failure(){
    console.log('failure');
    switch(error){
      case 'email': 
        alert('Login Failed. Incorrect Email Address.');
        setError('');
        break;
      case 'password':
        alert('Login Failed. Incorrect Password.');
        setError('');
        break;
      case 'both':
        alert('Login Failed. Incorrect Email Address and Password.');
        setError('');
        break;
    }
  }

  return (
    <TripleFrame
      center={
        <Card 
          bgcolor="dark"
          header="Login"
          title="Login with your Email and Password"
          text="Don't have an account? Click the create account button at the top"
          body={
            <div>
              {userInput &&
                <div> 
                  <Form 
                    show={{name:false,email:true,password:true,amount:false}} 
                    setEmail={setEmailAttempt}
                    setPassword={setPassAttempt}
                    email={emailAttempt}
                    password={passAttempt}
                    setUserInput={setUserInput}
                    setResult={setResult}
                    getError={getError}
                    task="Login"
                  />
                </div>
                }
              {result ? (success()) : (failure())}  
            </div>    
            }
        />
      }
    />
  )  
}