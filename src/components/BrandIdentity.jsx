import React from 'react';
import { Link } from 'react-router-dom';
import vocartLogo from '../assets/VOCART_LOGO.png';

const BrandIdentity = ({
  className = '',
  logoClassName = '',
  wordmarkClassName = '',
  textSizeClassName = '',
  onClick,
}) => (
  <Link to="/" aria-label="VOcart home" className={`flex min-w-fit items-center gap-3 ${className}`} onClick={onClick}>
    <img src={vocartLogo} alt="VOcart logo" className={`h-10 w-10 object-contain ${logoClassName}`} />
    <span className={`brand-logo-wordmark ${textSizeClassName} ${wordmarkClassName}`}>
      <span className="brand-logo-wordmark-vo">VO</span>
      <span className="brand-logo-wordmark-cart">cart</span>
    </span>
  </Link>
);

export default BrandIdentity;
