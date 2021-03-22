import React, { Component } from 'react';
import './style.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imc: 0,
      peso: '',
      altura: '',
      msg: '',
      acumulator: 0,
      adjust: false,
      pesoIdeal: 0
    }
    this.calcIMC = this.calcIMC.bind(this);
    this.formataResult = this.formataResult.bind(this);
    this.formatMsg = this.formatMsg.bind(this);
    this.adjustWeight = this.adjustWeight.bind(this);
  }

  componentDidMount() {

  }

  calcIMC(e) {
    let { imc, peso, altura } = this.state;
    this.setState({ pesoIdeal: 0 });
    this.setState({ acumulator: 0.1 });

    if (peso === '' || altura === '') {

      this.setState({ msg: 'preencha os campos!' });

    }
    else {
      imc = (peso / (altura * altura)).toFixed(1);

      this.formataResult(imc);

      this.adjustWeight(imc, peso, altura);
    }
    e.preventDefault();
  }
  formataResult(imc) {

    let valorTotal = imc.toString().replace(".", ",");

    this.setState({ imc: valorTotal });

    this.formatMsg(imc);
  }

  formatMsg(imc) {

      if (imc < 18.5) {
      let text = `Cuidado, você está abaixo do peso ideal`;
      this.setState({ msg: text });
    }
    else if ((imc > 18.5) && (imc < 24.9)) {
      let text = `Parabéns! você está dentro da faixa ideal de peso`;
      this.setState({ msg: text });

    }
    else if ((imc > 24.9) && (imc < 26)) {
      let text = `Você está com sobrebeso`;
      this.setState({ msg: text });
      
    }
    else if ((imc > 25.9) && (imc < 35)) {
      let text = `Infelizmente você está com obesidade nível 1`;
      this.setState({ msg: text });
      
    }
    else if (imc > 34.9 && imc < 40) {
      let text = `Cuidado! você está com obesidade nível 2`;
      this.setState({ msg: text });
      
    }
    else if (imc > 39.9) {
      let text = `Muito Cuidado! você está obesidade nível 3`;
      this.setState({ msg: text });
      
    }
    else {
      let text = ``;
      this.setState({ msg: text });
    }

  }

  adjustWeight(imc, peso, altura) {

    let acumulator = 0;
    let imc2 = imc;
    let pesoIdeal = 0;

    if (imc2 > 24.99) {
      while (imc2 > 25) {
        let nPeso = peso - acumulator;

        imc2 = nPeso / (altura * altura);
        acumulator = acumulator + 0.1;
        this.setState({ acumulator });

      }
      let pesoAdd = acumulator.toFixed(1);
      pesoIdeal = peso - pesoAdd;
    }
    else if (imc2 < 24.99) {
      while (imc2 < 25) {
        let nPeso = peso - acumulator;

        imc2 = nPeso / (altura * altura);
        acumulator = acumulator - 0.1;
        this.setState({ acumulator });
      }
      let pesoAdd = acumulator.toFixed(1);
      pesoIdeal = peso - pesoAdd;
    }



    this.setState({ pesoIdeal });





  }



  render() {
    return (
      <div>

        <div className="container">
          <h3>Calcule o seu IMC:</h3><br />
          <form onSubmit={this.calcIMC}>
            <label>Altura</label>
            <input type="number" value={this.state.altura} autoFocus autoComplete="off"
              onChange={(e) => this.setState({ altura: e.target.value })} />
            <label>Peso</label>
            <input type="number" value={this.state.peso} autoComplete="off"
              onChange={(e) => this.setState({ peso: e.target.value })} />
            <button type="submit">Calcular</button>
          </form><br />
        </div>


        {this.state.msg !== '' ?
          <div className="result">
            <h3>IMC: {this.state.imc}</h3>
            <p>{this.state.msg}</p>
            <p>Seu peso ideal é: {this.state.pesoIdeal} Kg</p>
          </div>
          :
          <div className="result">
            <h3>Bem-Vindo!</h3>
            <p>Calcule aqui seu IMC</p>
            <p>© 2021 - Pixeloko Studios</p>
          </div>
        }

      </div>
    );
  }
}
export default App;
