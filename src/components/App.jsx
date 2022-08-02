import { Component } from "react";
import Searchbar from "./Searchbar";
import s from './App.module.css';
 
// import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  state = {
    pokemon: null,
    loading: false,
}

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://pixabay.com/api/?q=cat&page=1&key=27913920-68ceae66209fe678afbf6b110&image_type=photo&orientation=horizontal&per_page=12')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }))
      .finally(() => this.setState({ loading: false })
      );
  }
  
  render() {
    return (
      <div className={s.app}>
        <Searchbar/>
        {this.state.loading && <h1>reload...</h1>}
      {this.state.pokemon && <div>Hello</div>}
      </div>
    );
  }
}
