
import Login from "./Login";
import StartPage from "./StartPage";
type propType=
{
    userLogedIn:()=>void
}
const LoginPage = ({userLogedIn}:propType) => {
  return (
    <div className="row " style={{overflowX:'hidden',overflowY:'hidden'}}>
      <div className="col-12 col-sm-12 col-md-7 col-lg-8">
        <StartPage />
      </div>
      <div className="col-12 col-sm-12 col-md-5 col-lg-4 ">
        <Login userLogedIn={userLogedIn}/>
      </div>
    </div>
  )
}

export default LoginPage