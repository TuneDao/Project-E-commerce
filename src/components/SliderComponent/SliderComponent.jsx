import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" height="800px" />
                )
            })}
        </Slider>
    )
}

export default SliderComponent