import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
//import logo from './images/logo.png'; // 
import AmareLogoPNG from './images/logo.png';
import AmareLogoSVG from './images/LogoVMsvg.svg'
import SoulmateButton from './images/SoulmateButton.svg';

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


       let question = ""; 
       const page = this.props.page;

        if (page == 'Home'){
          question = "Let's Ask The Stars To Find Your Celebrity... ";
        } 

        else if (page == 'Name'){
          question = "I'm Amāre, your mystic matchmaker. And you are?";
        }

        else if (page == 'Gender'){

          question = "Hey Micheal. So since birth, you've been a ...";

        }

        else if (page == 'Orientation'){

          question = "As a man ... Tell me all of whom you like.";


        }

        else if (page == 'Birthlocation'){

          question = "Where were you born?";

        }

        else if (page == 'Birthday'){

          question = "When were you born?";
        }

        else {
          question = null; 
        }

        

    return (
      <div>
        <h1 className="title">{question}</h1>
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
        <button  className="SoulmateButton" onClick={() => this.handleClick(this.props.choice)}>
          
         {this.props.buttonText}
          
          </button>
      </div>
      
     
      
    );
  }
}


class AmareLogo extends React.Component{

    
    render(){ 
      return(
        <div className="amare-logo">
          <img className="logo" src={AmareLogoSVG} alt="Amāre Logo" />
         
        </div>
      );
    }
  }


const pages = ['Home', 'Name', 'Gender', 'Orientation', 'Birthlocation', 'Birthday', 'Results']
class InitialPage extends React.Component{

    constructor(props) {
      super(props);
      //this.didChoose.bind(this);
      this.goToPage.bind(this); 
      this.previousPage.bind(this); 
      this.nextPage.bind(this);

      this.state = {
        question: "Let's Ask The Stars To Find Your Celebrity... ",
        page: "Home"
       };

      
      }

       // This function is called when the user clicks on the button
       
       
  
      


      // Changes pages for the registration 
      goToPage = (page) => {

        console.log('goToPage ' + page );

        let question = "Hi";
        /*

        if (page == 'Home'){
          question = "Let's Ask The Stars To Find Your Celebrity... ";
        } 

        else if (page == 'Name'){
          question = "I'm Amāre, your mystic matchmaker. And you are?";
        }

        else if (page == 'Gender'){

          question = "Hey Micheal. So since birth, you've been a ...";

        }

        else if (page == 'Orientation'){

          question = "As a man ... Tell me all of whom you like.";


        }

        else if (page == 'Birthlocation'){

          question = "Where were you born?";

        }

        else if (page == 'Birthday'){

          question = "When were you born?";
        }

        else {
          question = null; 
        }

        */

        this.setState({
          page: page,
         // question:{question} // This is the question that is displayed on the page
        }, () => { 

          console.log("The state of the page from goToPage  (InitalPage) is: " + this.state.page);

        }); // This is a callback function that is called after the state is set

        
      }


      previousPage = () => {
        console.log('Go to previous page')

        const currentPage = this.state.page;

        const pageNum = pages.indexOf(currentPage);
        const prevPageNum = pageNum - 1; 

        const pageToGoTo = pages[prevPageNum];

        this.setState({
          page: pageToGoTo
        });
      }

      nextPage = () => {

        console.log('Go to previous page')

        const currentPage = this.state.page;

        const pageNum = pages.indexOf(currentPage);
        const nextPageNum = pageNum + 1; 

        const pageToGoTo = pages[nextPageNum];

        this.setState({
          page: pageToGoTo
        });
      }

      

    render(){
      return(
        <div >
          
          <AmareLogo />

          <Question page={this.state.page} />

          <RegistrationSection page={this.state.page} pageSetter={this.goToPage} /> 


          <PageControl goBack={this.previousPage} goToNext={this.nextPage} currentPage={this.state.page} /> 


        
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
      this.props.pageSetter('Name');

    }

    render(){

      const page = this.props.page;
    
      console.log('RegistrationSection page: ' + this.props.page);
      
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

        return(

          <div>
            <h1> This is where we ask for the user's gender </h1>
          </div>
        );

      }

      else if (page == 'Orientation'){

        return(

          <div>
            <h1> This is where we ask for the user's sexual orientation </h1>
          </div>
        );

      }

      else if (page == 'Birthlocation'){

        return(

          <div>
            <h1> This is where we ask for the user's birth city </h1>
          </div>
        );
      }

      else if (page == 'Birthday'){

        return(

          <div>
            <h1> This is where we ask for the user's birthday </h1>
          </div>
        );

      }

      else {
        
        return(
          <div><h1> Nothing to see here</h1></div>
        );
      }

    }
  }


  

  // Page Control Section --->


  // Page Control 







  class BackButton extends React.Component{


    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
      console.log("Clicked back button");
      this.props.goBack();
    }

    render(){
      return(
        <div>
          <button onClick={this.handleClick}>Back</button>
        </div>
      );
    }
  }

  class NextButton extends React.Component{


    constructor(props){
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
      console.log("Clicked next button");
      this.props.goToNext();
    }

    render(){
      return(
        <div>
          <button onClick={this.handleClick}>Next</button>
        </div>
      );
    }
  }

  class PageControl extends React.Component{
    
    constructor(props){
      super(props); 
    }

    render(){

      if (this.props.currentPage == 'Home') {
        return(null);
      }

      return (

        <div> 
                <h1> Page Control </h1>
                <BackButton goBack={this.props.goBack} />
                <NextButton goToNext={this.props.goToNext} />
        </div>
      );
      
    }
  }


// End of Page Control Elements ---------------------------------------------------------
  
// End of First "Page" of the app ==========================================================










  class App extends React.Component{

    


    render(){

     // const isRegistering = this.state.isRegisering;

      return(
        <div className="app" class="gradient-background" >
          <InitialPage  />
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  