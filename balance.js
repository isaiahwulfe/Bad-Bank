function Balance(){
  const ctx = React.useContext(UserContext);
  const [currentBalance, setCurrentBalance] = React.useState(ctx.users[ctx.userInfo.userRef].balance);


  return (
    <TripleFrame
      center={
        <Card 
          bgcolor="dark"
          header="Balance"
          title="See Your Balance Here"
          body={
            <div className="balance">
              <UserBalance
                currentBalance={currentBalance}
              />
            </div>  
            }
        />
      }
    />  
  )
}