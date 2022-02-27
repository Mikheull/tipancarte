import React from 'react';
import Image from 'next/image';

const Footer = () => (
  <footer className="pt-5">
    <div className="custom-container mb-5 pb-5 pt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6">
          <p className="font-family-secondary font-size-display1 mb-4">
            Suivez nous
          </p>
          <div className="d-flex font-color-medium mb-5 pb-3 pb-md-0 mb-md-0">
            <div className="pr-5">
              <a
                href="https://twitter.com/TiPancarte"
                className="mb-3 d-block font-color-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/TiPancarte/"
                className="d-block font-color-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6">
          <p className="font-family-secondary font-size-display1 mb-3">
            Newsletter
          </p>
          <div className="position-relative">
            <input
              className="borderbottom border-color-gray400 h-48 w-100 px-3"
              placeholder="email address"
            />
            <button className="bg-transparent position-absolute right-0 top-50 translateY--50 pr-2 h-48">
              <Image src="/icon/arrow-long-right.svg" className="w-24" alt="Arrow icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="pt-md-5">
      <div className="bg-brand300">
        <div className="custom-container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="font-color-brand font-size-caption py-4 text-right">
              <p>&copy; { new Date().getFullYear() } TiPancarte.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
