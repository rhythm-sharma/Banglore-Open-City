import React from "react";

export default function FactContainer(props) {
  return (
    <div className="py-5">
      <h4 className="quicksand">{props.title || ""}</h4>
      <div className="wrapper mt-4">
        <div className="circle right shadow-lg"></div>
        <div className="circle left shadow-lg"></div>
        <div className="middle">
          <p>{props.fact || ""}</p>
        </div>
      </div>
    </div>
  );
}
