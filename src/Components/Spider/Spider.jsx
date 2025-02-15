import React from 'react';
import './Spider.css';

const Spider = () => {
  return (
    <div
      className="slider-container"
      style={{
        backgroundImage: `url('https://shtheme.org/demosd/nolez/wp-content/uploads/2020/03/slider-bg.jpg')`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="slider-content text-center">
              <div className="slider-text fadeInDown" style={{ animationDelay: '0.8s' }}>
                <h1>
                  Learn Today <br />
                  For a Better <br />
                  Tomorrow
                </h1>
              </div>
              <div className="slider-button fadeInUp" style={{ animationDelay: '4s' }}>
                <a href="#" className="slider-btn">
                  <i className="fas fa-book"></i> Admission Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
  );
};

export default Spider;
