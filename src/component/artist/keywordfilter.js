import React, { Component } from 'react';
import Select from "react-select"
import apiUrl from "../../config"
import data from "../../data"
import axios from "axios"
import { Input } from "react-materialize"
class Keywordfilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            filterByIndustry: [],
            selectValue: "",
            filter: "",
        }
        this.selectcategory = this.selectcategory.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.radio = this.radio.bind(this)
    }
   
    selectChange(selectValue) {
        if(selectValue){
            
        let filterByIndustry = this.props.artists.filter((artist) => (artist.selectedIndustry === selectValue));
        this.setState({ selectValue, filterByIndustry });
        this.props.filterResult(filterByIndustry);
        } else 
        {
            this.setState({ selectValue, filterByIndustry:[] });
            this.props.filterResult(this.props.artists);
        }
    }
    selectcategory(e) {
        console.log(e)
    }
    mapcategory() {
        let newArray = data.industry.map((industry, key) => {
            return { value: key, label: industry.title }
        });
        return newArray
    }
    radio(e) {
        // e.preventDefault();
        console.log(e.target.value, e.target.name, "checked");
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        console.log(this.state)
        return (
            <form className=""  >
             
                <Select
                    id="vehicles"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
                    className="col s12"
                    matchPos="any"
                    onInputChange={this.selectcategory}
                    simpleValue
                    clearable={true}
                    placeholder="Filter by Industry"
                    name="selectIndustry"
                    disabled={false}
                    value={this.state.selectValue}
                    onChange={this.selectChange}
                    rtl={this.state.rtl}
                    openOnClick={false}
                    searchable={true}
                    options={this.mapcategory()}
                />
            </form>
        );
    }
}
export default Keywordfilter;