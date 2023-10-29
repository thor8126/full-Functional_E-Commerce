import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./../.././index.css";

const HomeIntro = () => {
  const images = [
    "./homeImages/img_bg_1.jpg",
    "./homeImages/img_bg_2.jpg",
    "./homeImages/img_bg_4.jpg",
    "./homeImages/img_bg_5.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const navigateToSlide = (slideIndex) => {
    setCurrentImage(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="relative z-10">
      <Carousel
        showThumbs={false} // Hide thumbnails
        selectedItem={currentImage}
        onChange={(index) => navigateToSlide(index)}
      >
        {images.map((image, index) => (
          <div key={index}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "600px",
              }}
            >
              <div className="text-center" style={{ color: "white" }}>
                <h1 className="head-1">Men's</h1>
                <h2 className="head-2">Shoes</h2>
                <h2 className="head-3">Collection</h2>
                <p className="category">
                  <span>New trending shoes</span>
                </p>
                <p>
                  <a href="#" className="btn btn-primary">
                    Shop Collection
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeIntro;
