import React from 'react';
import { Text, Link } from '@geist-ui/core'

const imagesInfo = [
  {
    ref: 'feed_01',
    image: '/images/insta/original__post_insta.png',
    translateRatio: -50
  },
  {
    ref: 'feed_02',
    image: '/images/insta/2.jpg',
    translateRatio: 30
  },
  {
    ref: 'feed_03',
    image: '/images/insta/3.jpg',
    translateRatio: 0
  },
  {
    ref: 'feed_04',
    image: '/images/insta/4.jpg',
    translateRatio: -20
  },
  {
    ref: 'feed_05',
    image: '/images/insta/5.jpg',
    translateRatio: -80
  }
];

export default class SocialMedia extends React.Component {
  constructor(props) {
    super(props);

    this.followContainer = React.createRef();
    this.images = [];

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    window.requestAnimationFrame(this.animate);
  }

  animate() {
    if (!this.followContainer.current) {
      return;
    }
    const dimensions = this.followContainer.current.getBoundingClientRect();

    if (dimensions.top - window.innerHeight < 0 && dimensions.bottom > 0) {
      const scrolledRatio =
        (window.innerHeight - dimensions.top) / window.innerHeight;

        imagesInfo.forEach((image, index) => {
          const translateRatio = imagesInfo[index] ? imagesInfo[index].translateRatio : 0;
          const el = document.getElementById(image.ref);
          el &&
            (el.style.transform = `translateY(${scrolledRatio * translateRatio}px)`);
        });
    }
  }

  render() {
    return (
      <div className="mx-auto max-w-7xl md:px-0 px-10 footer-follow" ref={this.followContainer}>
        <div className='w-full md:w-1/2 mx-auto'>
          <Text h2>Suivez nous sur Instagram pour des idées de pancartes</Text>
          <Link href="https://instagram.com/tipancarte" target={"_blank"} rel="noreferrer" icon><span className='underline'>Instagram</span></Link>
        </div>
          
        <div className="flex footer-follow--images">
          {imagesInfo.map((item, i) => (
            <div key={i} className="justify-end flex-col follow-images">
              <div
                id={item.ref}
                style={{
                  paddingBottom: '100%',
                  background: `url("${item.image}") center center/cover`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}