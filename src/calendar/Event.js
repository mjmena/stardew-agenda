import React from 'react';
import PropTypes from 'prop-types';

import data from './../data/data'
import CropSelect from './event/CropSelect'

export default class Event extends React.Component{
    state = {
        crops: data.crops,
        crop: null
    }
    
    
    handleChangeCrop = (crop) => {
        this.setState({crop})
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.crop) {
            this.props.addEvent(this.state.crops.find((crop)=>crop.id===this.state.crop))    
        }
        
    }
    
    render(){
        return (<form onSubmit={this.handleSubmit}>
            <CropSelect crops={this.props.crops} currentCrop={this.state.crop} changeCrop={this.handleChangeCrop} />
            <input type="submit" value="Submit"/>
            </form>
        )
    }
}

Event.propTypes = {
    addEvent: PropTypes.func.isRequired
}

