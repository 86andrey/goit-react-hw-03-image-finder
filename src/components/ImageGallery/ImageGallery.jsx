
import { Component } from "react";
import Modal from "../Modal/Modal";
// import Audio from '../Loader';
import { TailSpin } from 'react-loader-spinner';



export default class ImageGallery extends Component {
    state = {
      image: null,
      error: null,
      status: 'idle',
      open: false
}
  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.imageInfo;
    const nextImage = this.props.imageInfo;

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending'});      
        fetch(`https://pixabay.com/api/?q=${nextImage}&page=1&key=27913920-68ceae66209fe678afbf6b110&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error(`Нет таких картинок c именем ${nextImage}`),
            );
      })
          .then(image => this.setState({ image, status:'resolved' }))
          .catch(error=>this.setState({error, status:'rejected'}))            
        }
    }
  render() {
    const { image, error, status } = this.state;
    
    if (status === 'idle') {
      return <div>Введите имя</div>
    }
    if (status === 'pending') {
      return <TailSpin color="#00BFFF" height={180} width={180} />
    }
    if (status==='rejected') {
      return <h1>{error.message}</h1>
    }
    if (status === 'resolved') {
      return (<>
        <ul className="gallery">
          {image.hits.map(item => (
            <li key={item.id} className="gallery-item" onClick={()=>this.setState({open:true})}>
            <img
              src={item.webformatURL}
              width="240"
              height="100"
              alt={item.tags} />
          </li>))}
        </ul>
        <Modal
          onClose={() => this.setState({ open: false })}
          open={this.state.open} />
        </>
      )
    }
  }
};
