import React, { Component } from 'react';
import setAuthorizationToken from "../auth"
import { SideNav, SideNavItem, Icon, Button } from "react-materialize"
class Sidebar extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
       
    }
    logout() {
        localStorage.removeItem("jwToken");
        setAuthorizationToken(false);
        var url = window.location.pathname;
        window.location.assign("/")
    }
    render() {

        return (
            <div className="side">
                <SideNav trigger={<a href="#" style={{paddingLeft:"8px"}}>
                    <b> <i style={{ color: "#eee" }} className="material-icons bar" >menu</i></b>
                </a>} options={{ closeOnClick: true }}>
                    {/* <SideNavItem userView user={{ background: this.props.auth.isAuthenticated && this.props.auth.user.bgUrl ? this.props.auth.user.bgUrl : "../../../images/rockstar.jpg", image: this.props.auth.isAuthenticated && this.props.auth.user.dp  ?  this.props.auth.user.dp : "../../../images/user.png", name: this.props.auth.isAuthenticated ? this.props.auth.user.firstName + " " + this.props.auth.user.lastName : "Guest", email: this.props.auth.isAuthenticated ? this.props.auth.user.email : "Please sign in to continue" }} /> */}
                    <SideNavItem waves href='/' icon='home'>Home</SideNavItem>
                    {/* <SideNavItem waves href='/media-channel' icon='play_arrow'>Media Channel</SideNavItem> */}
                    {/* <SideNavItem waves href='/artist' icon='group'>Artist profile</SideNavItem> */}
                    <SideNavItem waves href='/marketplace' icon='shopping_cart'>Marketplace</SideNavItem>
                    {/* <SideNavItem waves href='/search' icon='search'>Search</SideNavItem> */}
                    {/* <SideNavItem waves href='/news' icon='cloud'>News</SideNavItem> */}
                    {/* <SideNavItem waves href='/calendar' icon='alarm'>Events</SideNavItem> */}
                    <SideNavItem subheader>Account</SideNavItem>
                    <SideNavItem divider />
                    {this.props.auth.isAuthenticated ?
                        <div>
                            <SideNavItem waves href='/dashboard'>Dashboard</SideNavItem>
                            <SideNavItem waves href='#' onClick={this.logout}>Logout</SideNavItem>
                        </div> :
                        <div>
                            <SideNavItem waves href='/login'>Login</SideNavItem>
                            <SideNavItem waves href='/pricing'>Register</SideNavItem>
                        </div>
                    }
                </SideNav>
                {/* <ul id="slide-out" className="sidenav">
                    <li><div className="user-view">
                        <div className="background">
                            <img src="images/office.jpg" />
                        </div>
                        <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
                        <a href="#!name"><span className="white-text name">TamTamTools</span></a>
                        <a href="#!email"><span className="white-text email">Please sign in to continue</span></a>
                    </div></li>
                    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="subheader">Subheader</a></li>
                    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul> */}
                <style>{`
                    a i.bar{
                        font-size: 2.2em
                    }
                    @media (max-width: 620px) {
                        a i.bar{
                            line-height:50px !important;
                        font-size: 2em
                    }
                  
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Sidebar;