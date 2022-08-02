import { Component } from "react";

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
        this.setState({ pokemonName: '' });
    };
    render() {
        return (
            <header class="searchbar">
                <form class="form">
                    <button type="submit" class="button">
                        <span class="button-label">Search</span>
                    </button>

                    <input
                        class="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
};


