import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Payments from './Payments'
class Header extends  Component{
  renderContent(){
    switch(this.props.auth){
      case null:
          return
      case false:
          return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/auth/google">Login with Google</a></li>
            <li><a href="/auth/github">Login with Github</a></li>

            </ul>
          )
      default:
           return (
                <ul id="nav-mobile1" className="right hide-on-med-and-down">
                <li><Payments /></li>
                <li style={{margin:'0 10px'}}>Credits:{this.props.auth.credits}</li>
                <li><a href="/api/logout">Logout</a></li>

                </ul>
           )
    }
  }
  render(){
    return(
      <div>
       <nav>
         <div className="nav-wrapper">
            <Link to={this.props.auth ? 'news' : '/'}
            className="brand-logo">
            NERDTALK
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">

               {this.renderContent()}
            </ul>
        </div>
      </nav>
    </div>
    )
  }
}

function mapToStateProps({auth}){
  return {auth}
}

export default connect(mapToStateProps)(Header);
