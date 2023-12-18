import React from "react";
import EmailWriter from "../components/EmailWriter";

const MainPage = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: `url("https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/06/BMD-4781-760x400.png")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <div>
        <EmailWriter />
      </div>
    </div>
  );
};

export default MainPage;
