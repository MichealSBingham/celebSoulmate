

import ReactDOM from 'react-dom/client';
import './index.css';
//import logo from './images/logo.png'; // 
import AmareLogoPNG from './images/logo.png';
import AmareLogoSVG from './images/LogoVMsvg.svg'
import SoulmateButton from './images/SoulmateButton.svg';
import StarfieldAnimation from 'react-starfield-animation'
import index from 'react-starfield-animation';
import { LineProgressBar } from '@frogress/line'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React, { useState } from 'react';
import Datetime from "react-datetime";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircleProgressBar from './CircleProgressBar';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
//import CircleProgressBar from './CircleProgressBarBase';



const celebSoulmateURL = 'https://us-central1-findamare.cloudfunctions.net/celebritySoulmate'


// Mock data for Celebrity
const profileImage2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/440px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg"
const profileImage3 = "https://upload.wikimedia.org/wikipedia/commons/2/25/Leonardo_DiCaprio_2014.jpg"; 
const profileImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80";
const bioSample = "Italian-French royalty, the daughter of Lorenzo, Duke of Urbino and Madeleine ...";
const oneLiner = "You and Andrea would have MINDBLOWING SEX";


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


const apiKey = "AIzaSyBzLx3X3TOlhv7k4U8n3pRTK5zJLXrlcAA"; 
//=========================================================



const theme = createTheme({
  palette: {
    mode: "dark", 
    
   
   
  },
});


// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdueGsgMhjf3QoOsuABtsquBPE5LzT2Mk",
  authDomain: "findamare.firebaseapp.com",
  databaseURL: "https://findamare-default-rtdb.firebaseio.com",
  projectId: "findamare",
  storageBucket: "findamare.appspot.com",
  messagingSenderId: "421594828735",
  appId: "1:421594828735:web:32bece8d63097527521b0a",
  measurementId: "G-JV9LFFF5YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



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
              <h1 className={!isMobile ? "title" : "title-mobile"}>Hey <span style={{fontWeight : 600}}>{this.props.userData.name}</span>, what do you identify as?</h1>
            </div>
            
          )

        }

        else if (page == 'Orientation'){

          question = "So what's your type?";


        }

        else if (page == 'Birthlocation'){

          question = "Where were you born?";

        }

        else if (page == 'Birthday'){

          question = "When were you born?";
        }

        else if (page =='Time'){
          question ="What time were you born?"; 
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


const pages = ['Home', 'Name', 'Gender', 'Orientation', 'Birthlocation', 'Birthday', 'Time', 'Results']
class InitialPage extends React.Component{

    constructor(props) {
      super(props);
      //this.didChoose.bind(this);
      this.goToPage.bind(this); 
      this.previousPage.bind(this); 
      this.nextPage.bind(this);
      this.setUserData.bind(this); 
      this.setLoadingStateForLocation.bind(this); 
      this.loadingTimestamp.bind(this); 
      this.setLoadingStateForPerson.bind(this); 
      this.findMatch.bind(this);
      

      this.state = {
        question: "Let's Ask The Stars To Find Your Celebrity... ",
        page: "Home", 
        name: null, 
        isLoadingForLocation: null, 
        loadingTimestamp: null, 
        loadingPerson: null
       };

      
      }


      setLoadingStateForPerson = (state) => {
        this.setState({
          loadingPerson: state
        })
      }
      

      // Sets the loading state for when we're grabbing the location... i.e. when the user sets their birth location, there should be some type of indication that it's loading the lat/lon since this is async 
      setLoadingStateForLocation = (state) => {
        this.setState({isLoadingForLocation: state});
        
      }



       // This function is called when the user clicks on the button
       
       
       
  
      componentDidMount(){
        ////window.scrollTo(0, 0)
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

        //window.scrollTo(0, 0);
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

        //window.scrollTo(0, 0)
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

        ////window.scrollTo(0, 0)
      }


      setUserData = (data, callback) => {

      
        this.setState(data, 
          
          () => {

            if (typeof callback == "function")
                callback();


          });
  
       
      }

      loadingTimestamp = (isLoading) => { 

        this.setState({loadingTimestamp: isLoading});
      }


      //Handles response from API after looking for celebrity soulmate 
      handleResponse = (json) => {

        console.log("handling response.")
        console.log(json)


        let celebName = json.name
        let celebBio = bioSample
        let celebImage = json.profile_image_url
        let celebOneLiner = oneLiner
        let sex = json.sex
        let love = json.love
        let chemistry = json.chemistry
        
        this.setState({
          celebName: celebName, 
          celebBio: celebBio,
          celebImage: celebImage,
          celebOneLiner: celebOneLiner,
          sex: sex, 
          chemistry: chemistry, 
          love: sex
        })



        this.setState({loadingPerson: false}, 
          
          () => {
            console.log("The state of the loadingPerson is " + this.state.loadingPerson);
          })
          

      }

      findMatch = () => {
        console.log("looking for match ..")
        //console.log("Finding match ..." + this.state); 

        const name = this.state.name;
        const birthLocation = this.state.location;
        const birthday = this.state.birthday;
        const gender = this.state.gender; 
        
        const orientation = this.state.orientation; 
        
        const postData = {

          name: name, 
          gender: gender, 
          orientation: orientation, 
          birthday: birthday.toString(), 
          longitude: birthLocation.longitude.toString(), 
          latitude: birthLocation.latitude.toString(), 
          knownTime: true 



        }




        fetch(celebSoulmateURL, 
          {
            method: "POST", 
            
            body: JSON.stringify(postData), 
            headers:  {
              "Content-Type": "application/json", 
             
            }
          })
      .then(response => response.json())
      .then(json => this.handleResponse(json) )
      .catch(error => console.log(error));


      

       

      


      }

      

    render(){

      if (this.state.page == 'Results'){

        if (false){
          
          //TODO: Show loading screen
          return (
            <h1> Loading ...  </h1>
          )

        } else{

          
          return (
            
            <CelebrityProfile name={this.state.celebName} image={this.state.celebImage} bio={this.state.celebBio} oneLiner={this.state.celebOneLiner} chemistry={this.state.chemistry} love={this.state.love} sex={this.state.sex}/>
          )
        }
        
       

      }


      return(
        <div >
          
          <AmareLogo />

          <Question page={this.state.page} userData={this.state} />

          <RegistrationSection findMatch={this.findMatch} page={this.state.page} pageSetter={this.goToPage} className="registrationSection" dataSetter={this.setUserData} locationLoadingState = {this.setLoadingStateForLocation} loadingTimestamp={this.loadingTimestamp}/> 


          <PageControl setLoadingStateForPerson = {this.setLoadingStateForPerson} goBack={this.previousPage} goToNext={this.nextPage} currentPage={this.state.page} locationLoadingState = {this.setLoadingStateForLocation} loadingStates = {this.state} /> 


        
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
      ////window.scrollTo(0, 0);
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
      this.setLocation.bind(this); 
      this.loadingForLocation.bind(this);
      this.state = {
        location: null, 
        date: null, 
        time: null, 
     
      }
      

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

    setOrientation = (sex) => {

      this.props.dataSetter({orientation: sex});
     this.props.pageSetter('Birthlocation');
     
     return; 
    }

    //TODO: Handle error if we cannot get the lat/lon 
    errorHappened = (error) => {
     // this.props.pageSetter('Home');
      if (error != null) {

        this.loadingForLocation(null);
      alert("An error happened. Try again.")
      }
     
    }


    //TODO: 
    // this is called to set the loading state of lat and lon/ 
    loadingForLocation = (isLoading) => {
      console.log("Loading for location: " + isLoading)
    this.props.locationLoadingState(isLoading);
    } 

    // Gets the latitude and longitude and sets in database 
    setLocation = (value) => {
      
      this.loadingForLocation(true);

      geocodeByPlaceId(value)
      //.then(results => console.log(results))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>

      this.setState({location: {
        lat: lat,
        lon: lng
      }}, () => {

        this.loadingForLocation(false);
        this.props.dataSetter({location: {latitude: lat, longitude: lng}});
        this.props.pageSetter('Birthday');
      })

      )

      .catch(error => this.errorHappened(error));

      

      // Get latitude and longitude of the location and will also get the offset 
      return; 
    }

    setDate = (value) => {

      console.log("setting date: " + value );
      this.setState({date: value})
      return; 
      
    }

    process = (stamp, json) => {

         console.log(json);

        const offset = json.rawOffset + json.dstOffset;
        console.log("offset: " + offset);
        console.log(stamp-offset);

        this.loadingForLocation(false); 
        let timestamp = stamp-offset;
        console.log("after loading  timestamp: " + timestamp);
        this.props.dataSetter({birthday: timestamp}, () => {
          console.log("<<< . find match after data setter..");
          this.props.findMatch(); 
        });
       
        
     } 
    


    setTime = (value) => {
      console.log("setting time: " + value );
      //this.setState({time: value})


      this.setState({time: value }, 
        () => {

          this.props.loadingTimestamp(true);

          const date = this.state.date  + " " + this.state.time +  "Z";

          //converts the date to the proper timezone 

          const stamp = moment(date).unix();  

          const lat = this.state.location.lat;
         const lon = this.state.location.lon;
         const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${stamp}&key=${apiKey}`

          


      fetch(url)
      .then(response => response.json())
      .then(json => this.process(stamp, json) )
      .catch(error => this.errorHappened(error));
     

    
       // This is a callback function that is called after the state is set
        })


//==========================================================================================
      // Testing date 

      
    }

     stringDateToTimestamp = (strDate) => {  
     // const offset = -18000
      const stamp = moment(strDate).unix();  

      const lat = this.state.location.lat;
      const lon = this.state.location.lon;

      const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${stamp}&key=${apiKey}`


      fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);

        const offset = json.rawOffset + json.dstOffset;
        console.log("offset: " + offset);
        console.log(stamp-offset);
      
        return stamp - offset;

      })
/*
      .then(response => {
        
        let res = response.json()
        console.log("response: " + res);
      
      })
      */
      .catch(error => this.errorHappened())



     // const dt = stamp - offset; 

      //return dt;  
    }
    
    
    locationToOffset = (location) => {

    }


    


    componentDidMount() {
      
      
    }
    

    render(){

      const page = this.props.page;
      let location = this.state.location
    
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
    <button className={!(isMobile) ? "MaleButton" : "MaleButton-mobile"} onClick={() => this.setSex("Male")}>👨🏾</button>
    <button className={!(isMobile) ? "FemaleButton": "FemaleButton-mobile"} onClick={() => this.setSex("Female")}>💁🏼‍♀️</button>
                </div>

  <button className={!(isMobile) ? "MoreGendersButton": "MoreGendersButton-mobile"} onClick={() => this.setSex("Other")}>🤷⁉️🤷🏻‍♀️</button>

          </div>
        );

      }


      else if (page == 'Orientation'){

        if (!isMobile){
          return(


           <div>
  
           <div className='btn-Group2' role='group'> 
           <button className={!(isMobile) ? "MaleButton" : "MaleButton-mobile"} onClick={() => this.setOrientation("Men")}>Men only 👨🏾</button>
           <button className={!(isMobile) ? "FemaleButton": "FemaleButton-mobile"} onClick={() => this.setOrientation("Women")}>Women only 💁🏼‍♀️</button>
                       </div>
       
         <button className={!(isMobile) ? "MoreGendersButton": "MoreGendersButton-mobile"} onClick={() => this.setOrientation("All")}>Everyone 💁🏼‍♀️👨🏾</button>
       
                 </div>

          );
        }

        return(

           <div>
  
    <div className='btn-Group2' role='group'> 
    <button className={!(isMobile) ? "MaleButton" : "MaleButton-mobile"} onClick={() => this.setOrientation("Men")}>👨🏾</button>
    <button className={!(isMobile) ? "FemaleButton": "FemaleButton-mobile"} onClick={() => this.setOrientation("Women")}>💁🏼‍♀️</button>
                </div>

  <button className={!(isMobile) ? "MoreGendersButton": "MoreGendersButton-mobile"} onClick={() => this.setOrientation("All")}>💁🏼‍♀️👨🏾</button>

          </div>
        );

      }
     

      else if (page == 'Birthlocation'){

        return(
        

        
<div className='google'>
      
      <GooglePlacesAutocomplete className="GooglePlacesAutocomplete"
      apiKey={apiKey}
        selectProps={{
          
          onChange: (res)=> {this.setLocation(res.value.place_id)}

    
        }}
      />
    </div>
          
         

  

        );
      }

      else if (page == 'Birthday'){

        return(

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
           marginTop: !isMobile ?  '2.5%' :  '10%'
          
            
          }}>
            <ThemeProvider theme={theme}>
            <TextField
        id="date"
        label="Birthday"
        type="date"
        className='date'
      color="primary"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
         
         
        }}
        onChange={(e) => {this.setDate(e.target.value)}}
      />
       </ThemeProvider>
          </div>
        );

      }
     

      else if (page =='Time'){

        return(

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: !isMobile ?  '2.5%' :  '10%',
          
            
          }}>
            <ThemeProvider theme={theme}>
            <TextField
        id="time"
        label="Time"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
        onChange={(e) => {this.setTime(e.target.value)}}
      />
      </ThemeProvider>
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

    if (this.props.page == 'Time'){
      console.log("Loading a person");
      this.props.setLoadingStateForPerson(true);


      
    }

   
    this.props.goToNext();
  }




  
  render(){


    if ( this.props.locationLoadingState  == false ){
      return (
        <div>
          <h1> Loading ... </h1>
          </div>
      )
    }

   

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
    
            
             <BackAndNextButtons page={this.props.currentPage} setLoadingStateForPerson={this.props.setLoadingStateForPerson} isLoading = {this.props.locationLoadingState} goBack={this.props.goBack} goToNext={this.props.goToNext} />
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







function LocationSelector()  {

  const [value, setValue] = useState(null);

 const handleSelection = () => {

  
  setValue(value);
  console.log("Selected: " + value);
}
 

  return (
    <div>
      <h1 className="LocationSelector">City: {value}</h1>
      <GooglePlacesAutocomplete
      apiKey={apiKey}
        selectProps={{
          value,
          onChange: handleSelection,
        }}
      />
    </div>
  );

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









  class CelebrityProfile extends React.Component{
    render(){
      

      return (

        <div className="CelebrityProfile">

          <div className="CelebrityProfile-image-container">
          <img className="CelebrityProfile-image" src={this.props.image} />
            </div>
          
          <h1  className="celebName" >{this.props.name}</h1>
          <h2  className="celebBio">{this.props.bio}</h2>
          <h3  className="oneLiner"> {this.props.oneLiner} </h3>
          

          
          <div className="progressBarContainer"> 

          <div className='progressBarChild1' > 
          <CircleProgressBar percentage={this.props.chemistry}  innerText="Chemistry" maxSize={"300px"} />
          </div>

          <div className='progressBarChild1' > 
          <CircleProgressBar percentage={this.props.love} innerText="Love" maxSize={"300px"} />
          </div>

          <div className='progressBarChild1' > 
          <CircleProgressBar percentage={this.props.sex} innerText="Sex" maxSize={"300px"} />
          </div>
    
            </div>

          
          </div>

      );
    }
  }













  class App extends React.Component{

    


    render(){



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
  

  class App2 extends React.Component{

    render(){
        
        return(
  
          <div className="app" class="gradient-background" >
           
           <Stars />
           <CelebrityProfile name="Andrea Bellew" image={profileImage3} bio={bioSample} oneLiner={oneLiner}
                             chemistry={88} love={95} sex={76}/>
          <BottomStars />

          </div>
        );
    }
  }






  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  //root.render(<App />);
  root.render(<App />);
//root.render(<CelebrityProfile name="Andrea Bellew" image={profileImage} bio={bioSample} oneLiner={oneLiner}/>  );