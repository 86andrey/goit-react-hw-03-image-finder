import { Component } from "react";
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
    state = {
        pokemonName: '',
    }
    handleNameChange = event => {
        this.setState({
            pokemonName: event.currentTarget.value.toLowerCase()
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.pokemonName);
        this.setState({ pokemonName: '' });
    };
    render() {
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={this.handleSubmit}>
                    <button className={s.button} type="submit" >
                        <span className={s.buttonLable}>Search</span>
                    </button>

                    <input
                        className={s.input}
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        );
    }
};




