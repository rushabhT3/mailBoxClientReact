import React, { useState } from "react";

import EmailWriter from "../components/EmailWriter";
import MailTable from "../components/MailTable";
import ComposeButton from "../components/ComposeButton";

const MainPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog((prevState) => !prevState);
  };

  const closeDialog = () => {
    // ! Show a confirmation dialog: window.confirm se
    const isConfirmed = window.confirm(
      "Are you sure? The message won't be saved."
    );
    if (isConfirmed) {
      setShowDialog(false);
    }
  };
  
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: `url("https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/06/BMD-4781-760x400.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ComposeButton openDialog={openDialog} />
      {showDialog ? (
        <div>
          <EmailWriter closeDialog={closeDialog} />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "90%",
            width: "100%",
          }}
        >
          <MailTable />
        </div>
      )}
      )
    </div>
  );
};

export default MainPage;
