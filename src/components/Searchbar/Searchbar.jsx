import { Component } from "react";
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
    state = {
        imageInfo: '',
    }
    handleNameChange = event => {
        this.setState({
            imageInfo: event.currentTarget.value.toLowerCase()
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imageInfo.trim() === '') {
           return toast.error('Введите значение');            
        }
        this.props.onSubmit(this.state.imageInfo);
        this.setState({ imageInfo: '3' });
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
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        );
    }
};




