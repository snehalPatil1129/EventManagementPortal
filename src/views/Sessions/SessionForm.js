import React, { Component } from 'react';
import {connect} from 'react-redux';

class SessionForm extends Component {
   
    componentWillMount(){

    }


    render(){
        return(
            <div> <h1> hello from sessions </h1> </div>
        )
    }
}

const mapStateToProps = ()=>{
    return{

    }
}

const matchDispatchToProps= () => {
    return{

    }
}
export default connect(mapStateToProps, matchDispatchToProps) (SessionForm);