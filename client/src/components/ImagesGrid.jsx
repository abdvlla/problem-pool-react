import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LazyLoad from "react-lazyload";

const ImagesGrid = ({ images }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
    {images.map((imagePath, index) => (
      <div key={index} className="relative">
        <LazyLoad
          height={200}
          offset={100}
          once
          placeholder={
            <div className="flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          }
        >
          <Zoom>
            <img
              className="w-full h-auto rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              src={imagePath}
              alt={`Image ${index + 1}`}
            />
          </Zoom>
        </LazyLoad>
      </div>
    ))}
  </div>
);

export default ImagesGrid;
