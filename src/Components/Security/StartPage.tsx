import "./StartPage.css";

const StartPage = () => {
  return (
    <div className="mb-0" style={{overflowY:"hidden"}}>
      <img src="src\assets\logo (1).png" className="ps-5 pt-3" />
      <div className="ps-5 mb-0">
        <p className="loginTitle mb-0">
          TURN <span style={{ color: "rgb(247, 177, 3)" }}>MILES</span>
          <br></br> INTO{" "}
          <span style={{ color: "rgb(100, 51, 146)" }}>MONEY</span>
        </p>
        <p className="rideText mb-0">RIDES ON TAP</p>
      </div>
      <img src="src\assets\img1.png" id="startPageImage" />
    </div>
  );
};

export default StartPage;
