import React, { memo } from "react";

const MemoTest = memo(({ value }: any) => {
  console.log("Rendering memo comoent");

  return (
    <div>
      <p>{value}</p>
    </div>
  );
});

export default MemoTest;
