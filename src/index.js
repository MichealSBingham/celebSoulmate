import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
//import logo from './images/logo.png'; // 



// Images 

//- TODO:  This should be local
const logo2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/2048px-Venus_symbol.svg.png";
const logo = "https://i.ibb.co/vch2ZC4/amare-logo-no-background.png";
const backgroundStyle = { backgroundColor: 'pink', 
backgroundSize: 'cover',

backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh', 
        
};

//=========================================================

















// First "Page" of the app ==========================================================
// The Text Element that displays the text/question for the user 

class Question extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{this.props.question}</h1>
      </div>
    );
  }
}


// Button for displaying the answer to the question
class Button extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Changes state of parent 
  handleClick = (choice) => {

    console.log("Clicked button: " + choice);
    // Sets parent state depending on the button clicked
    this.props.didChoose(choice);
  }



  render(){
    return(
      <div>
        <button onClick={() => this.handleClick(this.props.choice)}>{this.props.buttonText}</button>
      </div>
    );
  }
}


  class AmareLogo extends React.Component{

    
    render(){ 
      return(
        <div className="amare-logo">
          <img src={logo} alt="Amāre Logo" />
         
        </div>
      );
    }
  }



  class InitialPage extends React.Component{

    constructor(props) {
      super(props);
      this.didChoose.bind(this);
      this.state = {
        question: "Let's Ask The Stars To Find Your Celebrity... ",
       };

      
      }

       // This function is called when the user clicks on the button
      didChoose = (choice) => {
        console.log('You clicked the button: ' + choice);
        this.setState({
          question: choice == "twin" ? "Let's find your twin!" : "Let's Find Your Soulmate!",
        });
      }

      

    render(){
      return(
        <div >
          
          <Question question = {this.state.question} />
          
          <Button buttonText="Soulmate 😍" choice="soulmate" didChoose={this.didChoose}  />
          <Button buttonText="Twin 👯" choice="twin" didChoose={this.didChoose}  />
        </div>
      );
    }   



  }

// End of First "Page" of the app ==========================================================










  class App extends React.Component{

    


    render(){
      return(
        <div className="app" style={backgroundStyle}>
          <AmareLogo />
          <InitialPage />
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  