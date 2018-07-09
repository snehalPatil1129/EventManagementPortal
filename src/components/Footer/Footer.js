import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="#">Event Management Application</a> &copy; 2018 Eternus.</span>
        <span className="ml-auto">Powered by <a href="#">Eternus Solutions Pvt. Ltd.</a></span>
      </footer>
    )
  }
}

export default Footer;
