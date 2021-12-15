import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="centrado">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
