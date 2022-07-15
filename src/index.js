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
      this.goToPage.bind(this); 

      this.state = {
        question: "Let's Ask The Stars To Find Your Celebrity... ",
        page: "Home"
       };

      
      }

       // This function is called when the user clicks on the button
       
      didChoose = (choice) => {
        console.log('You clicked the button: ' + choice);
        this.setState({
          question: choice == "twin" ? "Let's find your twin!" : "Let's Find Your Soulmate!",
        });
      }
      


      // Changes pages for the registration 
      goToPage = (page) => {

        console.log('Go to page: ' + page );
        this.setState({
          page: {page}
        });
      }

      

    render(){
      return(
        <div >
          
          <AmareLogo />

          <Question question={this.state.question} />
          
          <RegistrationSection page={this.state.page} pageSetter={this.goToPage} /> 


          <PageControl /> 


        
        </div>
      );
    }   



  }

  

  // Registration Info Section ---> 

class RegistrationSection extends React.Component{


    // page: 
      // Home, Name, Gender, Orientation, Birthlocation, Birthday
    constructor(props){
      super(props); 


    }


    // Whether or not user picked soulmate or twin 
    didPick = (choice) => {

      console.log('Did pick: ' + choice)

      // Go to a page 
      this.props.pageSetter('Home')

    }

    render(){

      const page = this.props.page 

      if (page == 'Home'){

        return ( 
        
           <div>
          
          <Button buttonText="Soulmate 😍" choice="soulmate" didChoose={this.didPick}  />
          <Button buttonText="Twin 👯" choice="twin" didChoose={this.didPick}  />
           </div>
           
           );
       
      }

      else if (page == 'Name'){

        return(

          <div>
            <h1> This is where we ask for the user's name </h1>
          </div>
        );
      }

      else if (page == 'Gender'){

      }

      else if (page == 'Orientation'){

      }

      else if (page == 'Birthlocation'){

      }

      else if (page == 'Birthday'){

      }

      else {
        return null;
      }

    }
  }



  // Page Control 

  class PageControl extends React.Component{
    
    constructor(props){
      super(props); 
    }

    render(){

      return (
                <h1> Page Control </h1>
      );
      
    }
  }

  
// End of First "Page" of the app ==========================================================










  class App extends React.Component{

    


    render(){

     // const isRegistering = this.state.isRegisering;

      return(
        <div className="app" style={backgroundStyle}>
          <InitialPage />
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  