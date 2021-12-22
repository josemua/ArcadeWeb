import React from "react";
import ProjectCards from "Pages/private/ProjectCards";
import image1 from "assets/img1.jpg"
import image2 from "assets/img2.jpg"

const cards = [
    {
        id: 1,
        title: 'Crear Avances',
        image: image1,
        url: '/user/inscripciones'
    },
    {
        id: 2,
        title: 'Editar Avances',
        image: image2,
        url: '/user/avances/lista'
    }
]

function Cartas() {
    return (
        <div className="container">
            <div className="row">
                {
                    cards.map(card => (
                        <div className="col-md-4" key={card.id}>
                            <ProjectCards title={card.title} imageSource={card.image} url={card.url} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Cartas;