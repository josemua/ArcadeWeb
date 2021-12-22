import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div data-testid="loading" className="centrado">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
