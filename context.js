const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);


/* Components */

function TripleFrame(props){
  return(
    <div className="feature">
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={"./bitcoin.png"} className="wingImg" />
          </div>
          <div className="col">
            <div>
              {props.center}
            </div>
          </div>
          <div className="col">
            <img src={"./bitcoin.png"} className="wingImg" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{width: "33rem"}}>
        <div style={{textAlign: "center", backgroundColor: "black"}} className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (
            <div style={{borderRadius:"3px 18px 18px 10px", border:"3px solid goldenrod", backgroundColor:"goldenrod", paddingTop:".75rem", marginBottom:".75rem"}}>
              <h5 className="card-title" style={{textAlign: "center"}}>{props.title}</h5>
            </div>
          )}
          {props.text && (<p className="card-text" style={{textAlign: "center"}}>{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
        <div className="card-footer" style={{textAlign: "center", backgroundColor: "black"}}>
          <p>Bad Bank. Bad Business.</p>
        </div>
      </div>      
    );    
  }

function Form(props){
  const ctx = React.useContext(UserContext);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);

  function handleTask(){
    let final = "";
    if(nameError || emailError || passwordError || amountError === true){
      console.log(nameError, emailError, passwordError, amountError);
      return null;
    }
    else{
      switch(props.task){
        case "Deposit":
          final = parseInt(props.base) + parseInt(props.amount);
          ctx.users[ctx.userInfo.userRef].balance = final;
          props.setCurrentBalance(ctx.users[ctx.userInfo.userRef].balance);
          break;
        case "Withdraw":
          if((parseInt(props.base) - parseInt(props.amount)) < 0){
            alert('You cannot withdraw more money than you have')
          }
          if((parseInt(props.base) - parseInt(props.amount)) >= 0){
            final = parseInt(props.base) - parseInt(props.amount);
            ctx.users[ctx.userInfo.userRef].balance = final;
            props.setCurrentBalance(ctx.users[ctx.userInfo.userRef].balance);
          }
          break;
        case "Login":
          console.log(props.email, props.password);
          let cred1 = ctx.users.findIndex((array) => array.email === props.email);
          let cred2 = ctx.users.findIndex((array) => array.password === props.password);
          console.log(cred1, cred2);
          if(cred1 >= 0 && cred2 >= 0){
            props.setUserInput(false);
            props.setResult(true);
            console.log('success');
            ctx.userInfo.userRef = cred1;
            console.log(ctx.userInfo.userRef);
          }
          if(cred1 < 0 || cred2 < 0){
            props.getError(cred1, cred2);
            props.setResult(false);
            console.log('failure');
          }
          break;
        case "Create Account":
          console.log(props.name,props.email,props.password);
          let name = props.name;
          let email = props.email;
          let password = props.password;
          ctx.users.push({name,email,password,balance:100});
          props.setShow(false);
          break;
      }
    }
  }

  function lightBorder(){
    document.querySelector(".form").style.borderTop = '5px solid gold';
    document.querySelector(".form").style.borderRight = '5px solid gold';
    document.querySelector(".form").style.borderLeft = '5px solid gold';
  }

  function dimBorder(){
    document.querySelector(".form").style.borderTop = '5px solid goldenrod';
    document.querySelector(".form").style.borderRight = '5px solid goldenrod';
    document.querySelector(".form").style.borderLeft = '5px solid goldenrod';
  }

  function validation(field, label){
    switch(label){
      case "Name":
        if(field.match(/^[a-zA-Z ]+$/g)){
          setNameError(false);
        }
        if(!field.match(/^[a-zA-Z ]+$/g) || (!field)){
          setNameError(true);
        }
        break;
      case "Email":
        if(field.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
          setEmailError(false);
        }
        if(!field.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || (!field)){
          setEmailError(true);
        }
        break;
      case "Password":
        if(field.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g)){
          setPasswordError(false);
        }
        if(!field.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g) || (!field)){
          setPasswordError(true);
        }
        break;
      case "Amount":
        if(field.match(/^[0-9]+$/g)){
          setAmountError(false);
        }
        if(!field.match(/^[0-9]+$/g) || (!field)){
          setAmountError(true);
        }
        break;
    }
  }

  return (
    <div>
      <div className="form">
        {props.show.name && 
          <div>
            {nameError && <p style={{color:"red", padding:"0"}}>Name Can Only Be Letters</p>}
            Name<br/>
            <input type="input" className="form-control" id="name" placeholder="Enter name" value={props.name} onChange={e => {
              props.setName(e.currentTarget.value);
              validation(e.currentTarget.value, "Name")
              }} /> 
            <br/>
          </div>}
        {props.show.email && 
          <div>
            {emailError && <p style={{color: "red"}}>Please Enter A Valid Email Address</p>}
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={props.email} onChange={e => {
              props.setEmail(e.currentTarget.value);
              validation(e.currentTarget.value, "Email")
              }}/><br/>
          </div>}
        {props.show.password && 
          <div>
            {passwordError && <p style={{color: "red"}}>Password must be 6 characters and may contain uppercase, lowercase, numeric or special characters.</p>}
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={props.password} onChange={e => {
              props.setPassword(e.currentTarget.value);
              validation(e.currentTarget.value, "Password")
              }}/><br/>
          </div>}
        {props.show.amount && 
          <div>
            {amountError && <p style={{color: "red"}}>Amount can only be numbers</p>}
            Amount<br/>
            <input type="amount" className="form-control" id="amount" placeholder="Enter amount" value={props.amount} onChange={e => {
              props.setAmount(e.currentTarget.value);
              validation(e.currentTarget.value, "Amount")
              }}/><br/>  
          </div>}
      </div>
      <button type="submit" className="my-button" onMouseOver={lightBorder} onMouseOut={dimBorder} onClick={handleTask}>  
      {props.task}
      </button>
    </div>
  )
}

function UserBalance(props){
  const ctx = React.useContext(UserContext);

  return (
    <div style={{paddingBottom:".75rem"}}>
      {ctx.userInfo.loggedIn ? (
        <h1 style={{textAlign: "center"}}>Your Current Balance is:<br /> ${props.currentBalance}</h1>
      ) : (
        <h6 style={{textAlign: "center"}}>You Have No Balance. Please Login to Continue.</h6>
      )}
    </div>
  )
}