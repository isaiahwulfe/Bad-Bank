function Login(){
  const [userInput, setUserInput] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState('');
  const [emailAttempt, setEmailAttempt] = React.useState('');
  const [passAttempt, setPassAttempt] = React.useState('');
  const ctx = React.useContext(UserContext);

  let clockLength = ["2", "1"];

  function redirect(){
    window.location.href="#/balance/"
  }

  function countdown(){
    countdownCallback();
  }

  function countdownCallback(){
    let timerElement = document.getElementById("timer");
    if(clockLength.length > 0){
      console.log(clockLength.length);
      timerElement.innerHTML = clockLength.shift();
      setTimeout(() => countdown(), 1000);
    }
    if(clockLength.length < 1){
      return null;
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
    setTimeout(() => redirect(), 3000);
    return(
      <div style={{textAlign:"center"}}>
        <h4>Success!</h4>
        <div>You are now logged in. You will be redirected in <span id="timer">3</span> seconds.</div>
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