import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew' ;


class App extends Component{
  //lifecycle method
  //the time this component renders on the on the screen go ahead and fetch the current user or figure out whether or not this user is currently signed in
  componentDidMount(){
     this.props.fetchUser();
  }

  render(){
    return(
          <div className="container">
            <BrowserRouter>
               <div>
                  <Header />
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/surveys" component={Dashboard} />
                  <Route path="/surveys/new" component={SurveyNew} />



               </div>
            </BrowserRouter>
          </div>
    )
  }
}

export default connect(null,actions)(App);
