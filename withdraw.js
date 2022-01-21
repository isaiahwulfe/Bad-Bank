function Withdraw(){
  const ctx = React.useContext(UserContext);
  const [amount, setAmount] = React.useState('');
  const [currentBalance, setCurrentBalance] = React.useState(ctx.users[ctx.userInfo.userRef].balance);

  return (
    <TripleFrame
      center={
        <Card 
          bgcolor="dark"
          header="Withdraw"
          title="Withdraw Funds From Your Account Here"
          body={
            <div id="hud">
              <UserBalance
                currentBalance={currentBalance}
              />
              {ctx.userInfo.loggedIn &&
                <Form 
                  show={{name:false,email:false,password:false,amount:true}}
                  setAmount={setAmount}
                  amount={amount}
                  task="Withdraw"
                  base={ctx.users[ctx.userInfo.userRef].balance}
                  setCurrentBalance={setCurrentBalance}
                />
              }
            </div>
          }
        />  
      }
    />
  )
}