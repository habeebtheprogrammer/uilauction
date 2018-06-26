import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Tabs, Tab, Button, Collapsible, CollapsibleItem, MediaBox } from "react-materialize"
import axios from "axios"
import { Player } from 'video-react';
import apiUrl from "../../config"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Audio from 'react-audioplayer';
import auth from "../../reducer/index"
import { setUserProfile, editUserProfile } from "../../actions/index"
import FileUpload from "react-fileupload"
import moment from "moment"
import Contact from "./contact"
import Contactdetails from "./contactdetails"
import Countdown from 'react-countdown-now';

import Work from "./work"
import Description from "./description"
import Banner from "./banner"
import YouTube from "react-youtube"
import Productmodal from "./productmodal"
import Bannerslider from "../slider/bannerslider"
import Picturemodal from "./picturemodal"
import Videomodal from "./videomodal"
import Audiomodal from "./audiomodal"
import Calendar from "./calendar"
import Youtube from "./youtube"

import Details from "./details"
import Items from "./items"
function mapStateToProps(state) {
    return {
        auth: state.auth,
        profile: state.profile.bioData,
        items: state.profile.items
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserProfile: setUserProfile,
        editUserProfile: editUserProfile
    }, dispatch)
}


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            artist: "",
            productModal: false,
            pictureModal: false,
            bids: [],
            videoModal: false,
            items: [],
            firstLoad: true,
            productToggle: false,
            pictureToggle: false,
            videoToggle: false,
            audioToggle: false,
            audioModal: false,
        }
        this.editBio = this.editBio.bind(this)
        this.editDesc = this.editDesc.bind(this)
        this.editWorkExp = this.editWorkExp.bind(this)
        this.editContact = this.editContact.bind(this)
        this.productModal = this.productModal.bind(this)
        this.pictureModal = this.pictureModal.bind(this)
        this.openProductModal = this.openProductModal.bind(this)
        this.openPictureModal = this.openPictureModal.bind(this)
        this.openVideoModal = this.openVideoModal.bind(this)
        this.videoModal = this.videoModal.bind(this)
        this.openAudioModal = this.openAudioModal.bind(this)
        this.audioModal = this.audioModal.bind(this)
        this.deletevideo = this.deletevideo.bind(this)
        this.deletepicture = this.deletepicture.bind(this)
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/dashboard?token=${token}`).then((res) => {
            if (res.data.user) {
                this.setState({ bids: res.data.items.bids })
                this.props.setUserProfile({ profile: res.data.user, items: res.data.items })
                // this.setState({ audios: this.props.items.audios})

            } else console.log(res)
        })
    }

    editBio(bio) {
        let userprofile = this.props.profile;
        userprofile.bio = bio;
        this.props.editUserProfile(userprofile)
    }
    editDesc(desc) {
        let userprofile = this.props.profile;
        userprofile.desc = desc;
        this.props.editUserProfile(userprofile)
    }
    editWorkExp(exp) {
        let userprofile = this.props.profile;
        userprofile.workExp = exp;
        this.props.editUserProfile(userprofile)
    }
    editContact(desc) {
        let userprofile = this.props.profile;
        // userprofile.workExp = exp;
        // this.props.setUserProfile(userprofile)
    }
    productModal(bool) {
        this.setState({ productModal: bool, firstLoad: false })
    }
    openProductModal(e) {
        e.preventDefault();
        this.setState({ productModal: true, firstLoad: false, productToggle: true })
    }
    pictureModal(bool) {
        this.setState({ pictureModal: bool, firstLoad: false })
    }
    openPictureModal(e) {
        e.preventDefault();
        this.setState({ pictureModal: true, firstLoad: false, pictureToggle: true })
    }
    videoModal(bool) {
        this.setState({ videoModal: bool, firstLoad: false })
    }
    openVideoModal(e) {
        e.preventDefault();
        this.setState({ videoModal: true, firstLoad: false, videoToggle: true })
    }
    audioModal(bool) {
        this.setState({ audioModal: bool, firstLoad: false })
    }
    openAudioModal(e) {
        e.preventDefault();
        this.setState({ audioModal: true, firstLoad: false, audioToggle: true })
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    deletevideo(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletevideo`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.reload();
            }
        })
    }
    deletepicture(e, id) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/deletepicture`, { id, token }).then((res) => {
            if (res.data.success) {
                window.location.reload();
            }
        })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }

    renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            // Render a completed state
            return <span className="red-text"><b>Bid Closed!</b></span>;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    render() {
        console.log(this.state)
        let token = localStorage.getItem("jwToken");
  
        return (
            <div className="dashboard">
                {/* {this.state.firstLoad !== true && this.state.productToggle ? <Modal closeProductModal={this.productModal} productModal={this.state.productModal} /> : null} */}
                {/* {this.state.firstLoad !== true && this.state.pictureToggle ? <Pmodal closePictureModal={this.pictureModal} pictureModal={this.state.pictureModal} /> : null} */}
                {/* {this.state.firstLoad !== true && this.state.videoToggle ? <Vmodal closeVideoModal={this.videoModal} videoModal={this.state.videoModal} /> : null} */}
                {/* {this.state.firstLoad !== true && this.state.audioToggle ? <Amodal closeAudioModal={this.audioModal} audioModal={this.state.audioModal} /> : null} */}
                <Navbar />
                <div className="container">
                <div className="row " style={{ marginTop: "20px" }}>
                    <div className="col s12 m3 adjust-pad">
                        <Contact profile={this.props.profile} editBio={this.editBio} />
                            {/* <Youtube profile={this.props.profile} /> */}
                        
                        <Items products={this.state.products} />


                        {/* <Work profile={this.props.profile} editWorkExp={this.editWorkExp} /> */}
                        {/* <Contactdetails profile={this.props.profile} editContact={this.editContact} /> */}

                    </div>
                    <div className="col s12 m6 adjust-pad">
                        {/* <Banner profile={this.props.profile} /> */}

                        <div className="row " style={{ margin: "1px 1px 10px" }}>

                            <div className="col s12 no-padding ">
                                <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                                    <li className="collection-header" ><h6 >Sell an item
                                                                                      <Productmodal profile={this.props.profile}/>

                                    </h6>
                                        <span className="grey-text" style={{ fontSize: "0.8em" }}> uploaded items needs to be approved before there can be displayed in the marketplace</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 no-padding ">
                                <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                                    <li className="collection-header" ><h6 >Bids
                                                                                     

                                    </h6>
                                        <span className="grey-text" style={{ fontSize: "0.8em" }}>{this.state.bids.length>0?`You have bid on ${this.state.bids.length} items`:"You have not place any bid yet"}</span>
                                    </li>
                                        {this.state.bids ? this.state.bids.map((item, key) => (
                                            <li key={key} className="collection-item avatar">
                                                <img src={`${item.imgUrl || "../../images/user.png"}`} alt="" className="circle" />
                                                <p><span className="">{this.substr(item.productTitle, 40)} </span><br />
                                                 <small>  
                                                        <span>Bid placed at  </span><span className="grey-text">N{item.bid}</span><br />
                                                
                                                </small>
                                                    <small> <Countdown date={moment(item.date).dates() + item.duration}
                                                        renderer={this.renderer} /></small>
                                                </p>
                                                
                                                    <Link to={`/marketplace/${item.productID}`} className="btn small  transparent grey-text right z-depth-0" style={{ fontSize: "0.6em", border: "1px solid lightgrey" }}>View item</Link>

                                                {/* <Link to={`artists/${artist._id}`} className="secondary-content grey-text text-darken-4"><i className="material-icons">grade</i></Link> */}
                                            </li>
                                        )) : null}
                                </ul>
                            </div>
                        </div>
                            {/* <Work profile={this.props.profile} editWorkExp={this.editWorkExp} /> */}
                            {/* <Description profile={this.props.profile} editDesc={this.editDesc} /> */}
                        
                    </div>
                    <div className="col m3 adjust-pad">
                        <div className="row">
                            <div className="col s12 no-pad">
                                {/* <Bannerslider /> */}
                                <Calendar profile={this.props.profile} />
                            </div>
                        </div>
                       
                    </div>
                </div>
                </div>
                <Footer />
                <style>{`
                    body{
                        background:#f7f7f7
                    }
                 
                         .dashboard .adjust-pad{
                        padding-right:0px;
                    }
                    .tabs .tab a{
                        color:#222;
                    }
                    .tabs .indicator{
                        background:#222
                    }
                    .tabs .tab a:hover, .tabs .tab a.active {
                        background-color: transparent;
                        color: #222;
                    }                   
                      .dashboard .container{
                        width:95%;
                        margin:auto;
                    }
                         .dashboard .collapsible-header{
                       padding:0px;
                       border:0px;
                    //    font-size:0.9em;
                   }
                   .dashboard .collapsible-header:hover{
                       background:#eee;
                   }
                  .dashboard .collapsible{
                       box-shadow:none;
                       border:0px;
                   }
                   .inherit{
                       display:inherit !important
                   }
                     .dashboard .collapsible i{
                       font-size:1em;
                   }
                    .dashboard .x-card{
                        background:#fff;
                        padding:20px;
                        margin:10px 0px 0px;
                        color:#222;
                    }
                    .dashboard .x-card .title{
                        font-size:1.4em;
                    }
                    .dashboard .custom-title{
                        font-size:1.4em;
                        margin:0px;
                    }
                    .dashboard .video-tag{
                      
                        width:100%;

                    }
                    .padding-right{
                        padding-right: 0px !important
                    }
                    .no-padding{
                        padding:0px 
                    }
                    .video-react-big-play-button.video-react-big-play-button-left{
                        border:none !important;
                        // position:inherit !important;


                    }
                    .col-pad{
                        padding: 0px 20px !important
                    }
                      .radio .media-round{
                        position:relative;
                        display:inline-block;
                        padding:3px 5px 0px;
                        // margin:25px 0px;
                        // border:2px solid #eee;
                        border-radius:100%;
                        transition:0.2s ease-in;
                        background:#fff;
                    }
                    .no-border{
                        border:0px !important
                    }
                    .radio a i{
                        color:rgb(244, 67, 54)
                    }
                    .radio a:hover .media-round{
                        background:rgb(244, 67, 54);
                        // border:2px solid #fff;
                        transition:0.2s ease-in
                    }
                     .radio a:hover i{
                         color:#fff; 
                     }
                    @media (max-width: 620px) {
                           .dashboard .adjust-pad{
                        padding-left:0px;
                    }
                     .padding-right{
                        padding-right: inherit;
                    }
                       .no-pad{
                        padding:0px !important
                    }
                      .row{
                        margin:0px !important
                    }
                      .dashboard .profile-box{
                        padding-top: 100px;
                        width:100%;
                        position:relative
                    }
                       .col-pad{
                        padding: 0px !important;
                        font-size:0.9em
                    }
                    
                }
                `}</style>
            </div >
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);