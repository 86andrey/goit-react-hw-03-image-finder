import React, { Component } from "react";
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };
    
    state = {
        imageSearch: '',
    };

    handleImageChange = event => {
        this.setState({imageSearch: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imageSearch.trim() === '') {
           return toast.error('non name');            
        }
        this.props.onSubmit(this.state.imageSearch);

        this.setState({ imageSearch: '' });
    };

    render() {
        const onSubmit = this.handleSubmit;
        const pictureChange = this.handleImageChange;

        return (
            <header className={s.searchbar} >
                <form className={s.form} onSubmit={onSubmit}>
                    <button type="submit" className={s.button}>
                        <BsSearch size={20} />
                    </button>

                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        name="searchRequest"
                        value={this.state.imageSearch}
                        placeholder="Search images and photos"
                        onChange={pictureChange}
                    />
                </form>
            </header>
        );
    }
};




