import React from "react";

function ProjectCards({title, imageSource, url}) {
  return (
    <div className="card">
      <img src={imageSource} alt="" />
      <div className="card-body">
        <h3 className="card-tittle">{title}</h3>
        <p className="card-text text-secondary">Esta es la carta de prueba para la lista de cartas que redireccionan al avance de cada proyecto</p>
        <a href={url} className="btn btn-outline-secondary rounded-0">
          Go to this project
        </a>
      </div>
    </div>
  );
}

export default ProjectCards;