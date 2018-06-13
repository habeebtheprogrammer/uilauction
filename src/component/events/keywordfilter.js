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
            selectValue: ""
        }
        this.search = this.search.bind(this)
        this.selectcategory = this.selectcategory.bind(this)
        this.selectChange = this.selectChange.bind(this)
    }
    search(e) {
        axios.post(`${apiUrl}/api/getEvents`, { text: e.target.value }).then((res) => {
            if (res.data) {
              
            }
        })
    }
    selectChange(selectValue) {
        let filterByIndustry = this.state.events.filter((event) => (event.industry === selectValue));
        this.setState({ selectValue, filterByIndustry });
    }
    selectcategory(e) {
       
    }
    mapcategory() {
        let newArray = data.industry.map((industry, key) => {
            return { value: key, label: industry.title }
        });
        return newArray
    }
    render() {
        return (
            <form className="" >
                <Input name="gender" type='radio' value="male" label="Industry" checked="true" className='with-gap' />
                <Input name="gender" type='radio' value="male" label="Location" className='with-gap' />
                <Input name="gender" type='radio' value="female" label="Event" className='with-gap' />
            </form>
        );
    }
}

export default Keywordfilter;