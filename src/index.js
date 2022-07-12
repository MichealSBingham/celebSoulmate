import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Question extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.question}</h1>
      </div>
    );
  }
}



  const linkToImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/2048px-Venus_symbol.svg.png";

  class AmareLogo extends React.Component{

    
    render(){ 
      return(
        <div className="amare-logo">
          <img src={linkToImage} alt="Amare Logo" />
        </div>
      );
    }
  }




  class App extends React.Component{
    render(){
      return(
        <div className="app">
          <AmareLogo />
          <Question question="Let's Ask The Stars To Find Your Celebrity..." />
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  