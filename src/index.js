import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
//import logo from './images/logo.png'; // 
import AmareLogoPNG from './images/logo.png';
import AmareLogoSVG from './images/LogoVMsvg.svg'
import SoulmateButton from './images/SoulmateButton.svg';
import StarfieldAnimation from 'react-starfield-animation'
import index from 'react-starfield-animation';
import { LineProgressBar } from '@frogress/line'

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


const resolution = window.innerWidth;
const isMobile = resolution >= 320 && resolution <= 480;
const isTablet = resolution >= 768 && resolution <= 1024;
const isDesktop = !isMobile && !isTablet;

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

          return(
            <div>
              <h1 className={!isMobile ? "title" : "title-mobile"}>I'm <span style={{fontWeight : 800}}>Amāre</span>, your mystic matchmaker. And you are? </h1>
            </div>
            
          )
        }

        else if (page == 'Gender'){

          

          return(
            <div>
              <h1 className={!isMobile ? "title" : "title-mobile"}>Hey <span style={{fontWeight : 600}}>{this.props.userData.name}</span>, so since birth you've been a ... </h1>
            </div>
            
          )

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
        <h1 className={!isMobile ? "title" : "title-mobile"}>{question}</h1>
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

    const className = !isMobile ? "Button" : "Button-mobile"
    return(
      
      <div>
        <button  className={className} onClick={() => this.handleClick(this.props.choice)}>
        
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
          <img className={!isMobile ? "logo": "logo-mobile"} src={AmareLogoSVG} alt="Amāre Logo" />
         
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
      this.setUserData.bind(this); 
      this.state = {
        question: "Let's Ask The Stars To Find Your Celebrity... ",
        page: "Home", 
        name: null 
       };

      
      }

       // This function is called when the user clicks on the button
       
       
  
      componentDidMount(){
        window.scrollTo(0, 0)
      }


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

        window.scrollTo(0, 0);
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

        window.scrollTo(0, 0)
      }

      nextPage = () => {

        console.log('Go to previous page')

        const currentPage = this.state.page;

        console.log("leaving .." + currentPage)

        

        // Make sure the pages that require user input HAVE input before proceeding 
        if (currentPage == 'Name'){
          if (this.state.name == null){
            alert("Please enter your name");
            return;
          }
        }

        console.log("The entered name is " + this.state.name);
        

        const pageNum = pages.indexOf(currentPage);
        const nextPageNum = pageNum + 1; 

        const pageToGoTo = pages[nextPageNum];
        
        this.setState({
          page: pageToGoTo
        });

        window.scrollTo(0, 0)
      }


      setUserData = (data) => {

      
        this.setState(data);
  
       
      }
      

    render(){
      return(
        <div >
          
          <AmareLogo />

          <Question page={this.state.page} userData={this.state} />

          <RegistrationSection page={this.state.page} pageSetter={this.goToPage} className="registrationSection" dataSetter={this.setUserData} /> 


          <PageControl goBack={this.previousPage} goToNext={this.nextPage} currentPage={this.state.page} /> 


        
        </div>
      );
    }   



  }


  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this); 
    }

    scrollToTop(){
      window.scrollTo(0, 0);
      //alert('Scrolled to top');
      
    }

    componentDidMount(){
      setInterval(this.scrollToTop, 1000);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      

      // Each time this changes, we'll propogate the change to the parent
      this.props.dataSetter({name: event.target.value});
    }
  
    handleSubmit(event) {
      
      event.preventDefault();

      const name = this.state.value

      if ((name != null) & (name != '') ){
        this.props.dataSetter({name: name});
        this.props.pageSetter('Gender');
      }
      else {
        alert("Please enter your name");
      }
    }
  
    render() {
      return (
        <form  className="nameForm" onSubmit={this.handleSubmit}>
          <label>
            <input className={!(isMobile) ? "nameInput" : "nameInput-mobile"} type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Your Name" />
            
          </label>
         
        </form>
      );
    }
  }
  

  // Registration Info Section ---> 

class RegistrationSection extends React.Component{


    // page: 
      // Home, Name, Gender, Orientation, Birthlocation, Birthday
    constructor(props){
      super(props); 
      //this.setSex = this.setSex.bind(this); 

    }


    // Whether or not user picked soulmate or twin 
    didPick = (choice) => {

      console.log('Did pick: ' + choice)

      // Go to a page 
      this.props.pageSetter('Name');

    }

    setSex = (sex) => {

      this.props.dataSetter({gender: sex});
     this.props.pageSetter('Orientation');
     console.log("did select sex: " + sex )
     return; 
    }

    componentDidMount() {
      
      
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
           <NameForm dataSetter={this.props.dataSetter} pageSetter={this.props.pageSetter}/>
          </div>
        );
      }

      else if (page == 'Gender'){

        if (!isMobile){
          return(


           <div>
  
           <div className='btn-Group2' role='group'> 
           <button className={!(isMobile) ? "MaleButton" : "MaleButton-mobile"} onClick={() => this.setSex("Male")}>Man 👨🏾</button>
           <button className={!(isMobile) ? "FemaleButton": "FemaleButton-mobile"} onClick={() => this.setSex("Female")}>Woman 💁🏼‍♀️</button>
                       </div>
       
         <button className={!(isMobile) ? "MoreGendersButton": "MoreGendersButton-mobile"} onClick={() => this.setSex("Other")}>It's not that simple 🤷⁉️🤷🏻‍♀️</button>
       
                 </div>

          );
        }

        return(

           <div>
  
    <div className='btn-Group2' role='group'> 
    <button className={!(isMobile) ? "MaleButton" : "MaleButton-mobile"} onClick={this.setSex("Male")}>👨🏾</button>
    <button className={!(isMobile) ? "FemaleButton": "FemaleButton-mobile"} onClick={this.setSex("Female")}>💁🏼‍♀️</button>
                </div>

  <button className={!(isMobile) ? "MoreGendersButton": "MoreGendersButton-mobile"} onClick={this.setSex("Other")}>🤷⁉️🤷🏻‍♀️</button>

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




class BackAndNextButtons extends React.Component {

  constructor(props){
    super(props);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickBack = () => {
    console.log("Clicked back button");
    this.props.goBack();
  }

  handleClickNext = () => {
    console.log("Clicked back button");
    this.props.goToNext();
  }

  
  render(){

    return(

      <div>
  
    <div className='btn-Group' role='group'> 
    <button className={!(isMobile) ? "BackButton" : "BackButton-mobile"} onClick={this.handleClickBack}>  </button>
    <button className={!(isMobile) ? "ForwardButton": "ForwardButton-mobile"} onClick={this.handleClickNext}></button>
  </div>
  </div>
    );
  }

}


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
          <button className="BackButton" onClick={this.handleClick}></button>
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
          <button className="ForwardButton" onClick={this.handleClick}></button>
        </div>
      );
    }
  }

  class PageControl extends React.Component{
    
    constructor(props){
      super(props); 
    }

    percentComplete() {

      let current = this.props.currentPage;
      let index = pages.indexOf(current);
      let total = pages.length;

      return ((index+1) / total ) * 100;
    }

    render(){

      if (this.props.currentPage == 'Home') {
        return(null);
      }

    

      return (

        

        <div> 
    
            
             <BackAndNextButtons goBack={this.props.goBack} goToNext={this.props.goToNext} />
                <LineProgressBar
                      className="ProgressBar"
                      width={!(isMobile) ? 1000 : 350}
                      height={!(isMobile) ? 8 : 5}
                      percent={this.percentComplete()}
                      rounded={!(isMobile) ? 36 : 15}
                      progressColor="white"
                      containerColor="rgba(0, 0, 0, 0.3)"
                  />
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
       
       
       <meta name="viewport" content="initial-scale=1, viewport-fit=cover, width=device-width maximum=scale=1" ></meta>
  <meta name="apple-mobile-web-app-capable" content="yes"></meta>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        



          <Stars />
              <InitialPage />
             
                    <BottomStars />
          
        
  

       
         
        </div>
      );
    }
  }
  
  class Stars extends React.Component {
    render () {
      return (
        <StarfieldAnimation className="stars" depth={500} numParticles={800} 
        style={{
          position: 'absolute',
          
        
        }}
        />
      )
    }
  }


  class BottomStars extends React.Component {
    render () {
      return (
        
        <StarfieldAnimation className="stars2"
        numParticles={800} depth={500}
        style={{
          position: 'absolute',
          
        }}
      />
      )
    }
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  