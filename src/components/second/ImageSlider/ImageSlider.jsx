import { useState } from "react"
import { Dots, SliderWrapper } from "./ImageSlider.styled"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import { ArrowButton } from "components/Button/Button"
import { FaDotCircle } from "react-icons/fa"

 
const ImageSlider = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const goToPrevious =() => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1  : currentIndex - 1
        setCurrentIndex(newIndex)
    }
    const goToNext =() => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0  : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    const goToSlide =(slideIndex) => {
        setCurrentIndex(slideIndex)
    }
  return (
    <SliderWrapper>
        <ArrowButton 
        className="Previous"
        onClick={goToPrevious}>
            <MdArrowBackIos size={40}/>
        </ArrowButton>
        <ArrowButton
        className="Next"
         onClick={goToNext}>
            <MdArrowForwardIos size={40}/>
        </ArrowButton>
        <img src={slides[currentIndex].url} alt="slideImage" />
        <Dots>
            {slides.map((slide, slideIndex) => (
                <div 
                key ={slideIndex}
                onClick={()=> goToSlide(slideIndex)}
                className="Dot">
                    <FaDotCircle/>
               </div>
            ))}
        </Dots>
    </SliderWrapper>
  )
}

export default ImageSlider