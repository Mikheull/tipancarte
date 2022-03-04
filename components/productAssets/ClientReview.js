import React, { Component } from 'react';
import ReviewList from './ReviewList';
import Modal from '../common/atoms/Modal';
import Image from 'next/image';

const reviews = [
  {
    stars: 5,
    title: 'Nullam lectus nulla',
    description: 'Quisque id finibus urna, eget sodales lorem. Praesent quis tellus leo !',
    reviewBy: 'John Doe',
    date: 'Mars 2022'
  },
  {
    stars: 3.5,
    title: 'Aliquam!',
    description:
      'Nullam lectus nulla, dapibus tristique',
    reviewBy: 'John Doe',
    date: 'Mars 2022'
  },
  {
    stars: 4,
    title: 'Quisque porttitor',
    description:
      'Mauris rutrum ultricies ullamcorper. Sed scelerisque elit leo, sed posuere ex viverra ac',
    reviewBy: 'John Doe',
    date: 'Mars 2022'
  },
  {
    stars: 5,
    title: 'Maecenas augue!',
    description:
      'Maecenas in sollicitudin est. Quisque lacinia ut libero non euismod. Nullam fringilla, ante ac consectetur tincidunt, enim ipsum ornare lorem',
    reviewBy: 'John Doe',
    date: 'Mars 2022'
  },
  {
    stars: 5,
    title: 'Aenean id leo turpis!',
    description:
      'Quisque porttitor mauris a augue fermentum, quis fringilla sapien finibus. Vestibulum pulvinar ex quis vestibulum varius. Ut ultrices, justo vitae egestas fringilla, velit ligula efficitur',
    reviewBy: 'John Doe',
    date: 'Mars 2022'
  }
];

export default class ClientReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
   * Close the review modal
   */
  handleClose() {
    this.setState({ open: false });
  }

  /**
   * Show the review modal
   */
  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    const { open } = this.state;

    const total = reviews.map(function(review){
      return review.stars
    })
    const sum = total.reduce((a, b) => a + b, 0);
    const avg = (sum / total.length) || 0;

    return (
      <div id="reviews" className="custom-container pb-5">
        <Modal
          isOpen={open}
          onClose={this.handleClose}
          maxW="1000px"
        >
          <div className="d-flex justify-content-between align-items-center pb-3">
            <p className="font-size-subheader font-weight-medium">
              Tout les avis
            </p>
            <img
              tabIndex="0"
              src="/icon/cross.svg"
              className="w-24 cursor-pointer"
              onClick={this.handleClose}
              alt="Cross icon"
            />
          </div>
          <ReviewList reviews={reviews} full={true} />
        </Modal>
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="d-flex justify-content-between flex-column flex-sm-row align-items-sm-center mb-3">
              <p className="font-size-title font-weight-medium mb-2 mb-sm-0">
                {avg} étoiles sur {reviews.length} avis
              </p>
            </div>
            <ReviewList reviews={reviews} full={false}>
              <button
                type="button"
                onClick={this.handleOpen}
                className="text-center bg-transparent w-100 h-72 px-3 text-decoration-underline"
              >
                Voir tout les avis
              </button>
            </ReviewList>
          </div>
        </div>
      </div>
    );
  }
}
