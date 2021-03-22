import React, { Component } from 'react';


class CalcImc extends Component{

    constructor(props){
        super(props);
        this.state ={

        }
    this.calc = this.calc.bind(this);
    }

    calc(peso, altura){
        //let imc = '';
        return (peso / (altura * altura)).toFixed(2);
    }


}
export default CalcImc;