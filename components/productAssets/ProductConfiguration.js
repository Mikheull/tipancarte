import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { createProduct } from '../../store/actions/productActions';
import Select from 'react-select'
import colors from '../../seeds/colors.json';

class ProductConfiguration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      price: 4,
      configureOptions: {
        size: 'md',
        quantity: 1,
        content: [
          {
            color_background: '#384C6C',
            color_background_raw: 'Saphir 1',
            color_text: '#CB6F7A',
            color_text_raw: 'Cabaret 4',
            text: 'LE SOLEIL',
            direction: 'right',
            index: 0,
          }
        ],
        full_paint: false,
        varnishing: false,
      },
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddNewPlank = this.handleAddNewPlank.bind(this);
    this.updatePlank = this.updatePlank.bind(this);
  }

  componentDidUpdate(prevProps) {

  }
  /**
   * Update plank
   */
  updatePlank = (type, val, index) => {
    if(type == 'text'){
      this.setState(Object.assign(this.state.configureOptions.content [index], {text: val.toUpperCase()}))
    }
    if(type == 'color_background'){
      this.setState(Object.assign(this.state.configureOptions.content [index], {color_background: val.color_code}))
      this.setState(Object.assign(this.state.configureOptions.content [index], {color_background_raw: val.value}))
    }
    if(type == 'color_text'){
      this.setState(Object.assign(this.state.configureOptions.content [index], {color_text: val.color_code}))
      this.setState(Object.assign(this.state.configureOptions.content [index], {color_text_raw: val.value}))
    }
    if(type == 'arrow_direction'){
      this.setState(Object.assign(this.state.configureOptions.content [index], {direction: val}))
    }
  }


  /**
   * Get price of selected option
   */
  getPrice() {
    const {
      price: { raw: base },
      variant_groups: variantGroups,
    } = this.props.product;
    const { selectedOptions } = this.state;

    if (!selectedOptions || typeof selectedOptions !== 'object') {
      return base;
    }

    const options = Object.entries(selectedOptions);
    return base + options.reduce((acc, [variantGroup, option]) => {
      const variantDetail = variantGroups.find(candidate => candidate.id === variantGroup);
      if (!variantDetail) {
        return acc;
      }
      const optionDetail = variantDetail.options.find(candidate => candidate.id === option);
      if (!optionDetail) {
        return acc;
      }

      return acc + optionDetail.price.raw;
    }, 0);
  }

  /**
   * Add to Cart
   */
  async handleAddToCart() {
    // const { product } = this.props
    const { selectedOptions, configureOptions, price} = this.state;

    // Créer le produit ici
    const prod = await createProduct(configureOptions, price)
    this.props.dispatch(addToCart(prod.data.id, 1, selectedOptions))
  }

  /**
   * Add a plank
   */
  async handleAddNewPlank() {
    const index = this.state.configureOptions.quantity + 1;
    const body =  {
      color_background: '#384C6C',
      color_background_raw: 'Saphir 1',
      color_text: '#CB6F7A',
      color_text_raw: 'Cabaret 4',
      direction: 'right',
      text: 'Ti Punch',
      index: index - 1,
    }

    let arr = this.state.configureOptions.content 
    arr.push(body)

    this.setState({ price: this.state.price + 4 });
    this.setState(Object.assign(this.state.configureOptions, {quantity: index}))
    this.setState(Object.assign(this.state.configureOptions.content , arr))
  }

  render() {
    const { price } = this.state;
    const soldOut = this.props.product.is.sold_out;
    const priceSymbol = '€';
    const reg = /(<([^>]+)>)/ig;

    const sizes = [
      {key: 'sm', name: 'Petit'},
      {key: 'md', name: 'Normal'},
      {key: 'lg', name: 'Large'},
    ]


    const customStyles = {
      option: (styles, { data }) => {
        return {
          ...styles,
          backgroundColor: '#FFF',
          color: data.color_code,
          cursor: 'pointer',
          ':hover': {
            ...styles[':hover'],
            backgroundColor: data.color_code,
            color: '#FFF',
          },
        };
      },

      singleValue: (provided, state) => {
        return { ...provided, color: state.data.color_code };
      }
    }

    const customStylesDirection = {
      option: (styles, { data }) => {
        return {
          ...styles,
          backgroundColor: '#FFF',
          color: '#000',
          cursor: 'pointer',
        };
      },
    }

    return (
      <div className='custom-container pb-5' id="configuration">
        <div className='row'>
          <div className="col-12 ">
            <div className="d-flex justify-content-between flex-column flex-sm-row align-items-sm-center mb-3">
              <p className="font-size-title font-weight-medium mb-2 mb-sm-0">
                Configurer vos pancartes
              </p>
            </div>

            <div>
              {/* <div className='my-4'>
                <span className="mr-3 font-weight-semibold">Taille de vos planches :</span>
                {sizes.map(option => (
                  <span
                    key={option.key}
                    onClick={() => this.setState(Object.assign(this.state.configureOptions ,{size:option.key})) }
                    className={`mr-3 cursor-pointer ${
                      this.state.configureOptions.size == option.key
                        ? 'text-decoration-underline'
                        : 'text-decoration-none'
                    }`}
                  >
                    {option.name}
                  </span>
                ))}
              </div> */}

              <div className='my-4'>
                {this.state.configureOptions.content.map(plank => (
                  <div className="d-block d-lg-flex" key={plank.index}>
                    <div className={`col-12 col-lg-7 plank ${ plank.direction ? `plank-${plank.direction}` : '' }`} style={ { backgroundColor: `${ plank.color_background }` } }>
                      <span style={ { color: `${ plank.color_text }` } }>{plank.text}</span>
                    </div>

                    <div className='col-12 col-lg-1'></div>

                    <div className="col-12 col-lg-4">
                      <div className='row'>
                        <div className='col-6'>
                          <label className="w-100 mb-4">
                            <p className="mb-1 font-size-caption font-color-light text-left">
                              Texte
                            </p>
                            <input
                              name="text"
                              type="text"
                              onChange={(val) => this.updatePlank('text', val.target.value, plank.index)}
                              value={plank.text}
                              className="rounded-0 w-100"
                              required
                              maxLength={20}
                            />
                          </label>

                        </div>
                        <div className='col-6'>
                          <label className="w-100 mb-4">
                            <p className="mb-1 font-size-caption font-color-light text-left">
                              Direction
                            </p>
                            <Select
                              styles={customStylesDirection}
                              className="select_color"
                              onChange={(val) => this.updatePlank('arrow_direction', val.value, plank.index)}
                              options={[{value: 'left', label: 'Gauche'}, {value: 'right', label: 'Droite'}]} />
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-6'>
                          <label className="w-100 mb-4">
                            <p className="mb-1 font-size-caption font-color-light text-left">
                            Couleur du fond
                            </p>
                            <Select
                              styles={customStyles}
                              className="select_color"
                              onChange={(val) => this.updatePlank('color_background', val, plank.index)}
                              options={colors} />
                          </label>

                        </div>
                        <div className='col-6'>
                          <label className="w-100 mb-4">
                            <p className="mb-1 font-size-caption font-color-light text-left">
                              Couleur du texte
                            </p>
                            <Select
                              styles={customStyles}
                              className="select_color"
                              onChange={(val) => this.updatePlank('color_text', val, plank.index)}
                              options={colors} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='row d-flex'>
              <button onClick={this.handleAddToCart} disabled={soldOut} className="col-6 col-lg-4 h-56 bg-black font-color-white pl-3 pr-4 d-flex align-items-center flex-grow-1" type="button">
                <span className="flex-grow-1 mr-3 text-center">
                  { soldOut ? 'Rupture de stock' : 'Ajouter au panier' }
                </span>
                <span className="border-left border-color-white pl-3">
                {price} {priceSymbol}
                </span>
              </button>

              <div className='col-1 col-lg-6'></div>

              <button onClick={this.handleAddNewPlank} disabled={this.state.configureOptions.quantity >= 6} className="col-5 col-lg-2 h-56 bg-brand300 border border-color-black d-flex align-items-center flex-grow-1" type="button">
                <span className="flex-grow-1 mr-3 text-center">
                  { this.state.configureOptions.quantity >= 6 ? 'Limite de 6 planches' : 'Ajouter une planche' }
                </span>
              </button>
            </div>

            {/* <div>
              <h2>Output</h2>
              <p>{JSON.stringify(this.state.configureOptions)}</p>
            </div> */}

          </div>
        </div>

      </div>
    );
  }
}

export default connect(state => state)(ProductConfiguration);
