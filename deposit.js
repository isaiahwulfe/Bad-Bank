function Deposit(){
  const ctx = React.useContext(UserContext);
  const [amount, setAmount] = React.useState('');
  const [currentBalance, setCurrentBalance] = React.useState(ctx.users[ctx.userInfo.userRef].balance);

  return (
    <TripleFrame
      center={
        <Card 
          bgcolor="dark"
          header="Deposit"
          title="Deposit Funds To Your Account Here"
          body={
            <div id="hud">
              <UserBalance
                currentBalance={currentBalance}
              />
              {ctx.userInfo.loggedIn ? (<div>
                <Form 
                  show={{name:false,email:false,password:false,amount:true}} 
                  setAmount={setAmount}
                  amount={amount}
                  base={ctx.users[ctx.userInfo.userRef].balance}
                  setCurrentBalance={setCurrentBalance}
                  task="Deposit"
                />
              </div>) : (() => null)}
            </div>
          }
        />
      }  
    />
  )
}
