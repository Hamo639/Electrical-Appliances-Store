import React from 'react';

const Detailsimg = ({myRef,images,tab}) => {
  return (
    <div className="thumb" ref={myRef}>
        {
        images.map((img, index) =>(
            <img src={img} alt="" key={index} 
            onClick={() => tab(index)}
            />
        ))
        }
    </div>
)
}

export default Detailsimg;
