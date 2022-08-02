import { Component } from "react";


export default class ImageInfo extends Component {
    state = {
    image: null
}
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.imageInfo !== this.props.imageInfo) {
            console.log('изменилось имя покемона');
            fetch(`https://pixabay.com/api/?q=${this.props.imageInfo}&page=1&key=27913920-68ceae66209fe678afbf6b110&image_type=photo&orientation=horizontal&per_page=12`)
                .then(res => res.json())
                .then(image=>this.setState({image}));
        }
    }
    render() {
       
        return (
            
            <div>
                <h1>info</h1>
                {!this.props.imageInfo && <div>Введите имя</div>}
                {this.state.image && <div>{this.state.image.total}</div>}
            </div>
            
        )
    }
};