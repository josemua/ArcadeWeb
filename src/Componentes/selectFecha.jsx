import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class selectFecha extends Component {
state = {
    fecha: new Date("2021","2","2")
}

onChange=fecha=>{
    this.serState({fecha:fecha});
}

    render() {
        return (
            <div className="contenedor">
                <div className="center">
                    <DatePicker selected={this.state.fecha} onChange={this.onChange} />
                </div>
            </div>
        );
    }
}
export default selectFecha;