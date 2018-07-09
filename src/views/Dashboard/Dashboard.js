import React, { Component } from 'react';
import axios from 'axios'
class Dashboard extends Component {

  //test
  componentWillMount() {
    // let data = {
    //   info : "Hello this data is from react frontEnd Portal",
    //   url : "http://localhost:3000/api/aboutEternus"
    // }
    // let id = '5b4347b1b3c22522c433520a'; 
    // axios.put(`http://localhost:3000/api/aboutEternus/${id}`,data).then(response => {
    //   let data = response.data;
    //   console.log(data);
    // })
    //   .catch((error) => {
    //     console.log("Error" + error.message);
    //   })
  }
  render() {
    return (
      <div className="animated fadeIn">
        Hello World
      </div>
    )
  }
}

export default Dashboard;
