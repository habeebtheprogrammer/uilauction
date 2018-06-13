import React, { Component } from 'react';
import apiUrl from "../../config"
import data from "../../data"
import axios from "axios"
import { Input } from "react-materialize"
import Select from "react-select"
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            filterByIndustry: [],
            selectValue: "",
            filter:"",
        }
        this.search = this.search.bind(this)
        this.selectcategory = this.selectcategory.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.radio = this.radio.bind(this)
    }
    search(e) {
        axios.post(`${apiUrl}/api/getArtists`, { text: e.target.value }).then((res) => {
            if (res.data) {
                console.log(res.data)
            }
        })
    }
    selectChange(selectValue) {
        let filterByIndustry = this.state.artists.filter((artist) => (artist.selectedIndustry === selectValue));
        this.setState({ selectValue, filterByIndustry });
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
    radio(e){
        // e.preventDefault();
        console.log(e.target.value,e.target.name,"checked");
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        console.log(this.state)
        return (
            <form className=""  >
                <input type="radio" name="filter" checked="true"/>
                <Input name="filter" type='radio' value="industry" label="Industry" onChange={this.radio} checked={this.state.filter==="industry"?true:false} className='with-gap ' />
                <Input name="filter" type='radio' value="location" label="Location" onChange={this.radio} checked={this.state.filter === "location" ? true :false} className='with-gap ' />
                <Input name="filter" type='radio' value="artist" label="Artist" onChange={this.radio} checked={this.state.filter === "artist" ? true : false} className='with-gap ' />
                <Select
                    id="vehicles"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
                    className="col s5 right"
                    matchPos="any"
                    onInputChange={this.selectcategory}
                    simpleValue
                    clearable={true}
                    placeholder="Search"
                    name="selectSongs"
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

export default Search;