import ImageSlider from 'components/ImageSlider/ImageSlider'
import slide1 from '../img/slides/bobcat.jpg'
import slide2 from '../img/slides/deer.jpg'
import slide3 from '../img/slides/fox.jpg'
import slide4 from '../img/slides/monkey.jpg'
import slide5 from '../img/slides/panda.jpg'

const SlidesPage = () => {
    const slides = [
        {url: slide1, title: 'bobcat'},
        {url: slide2, title: 'deer'},
        {url: slide3, title: 'fox'},
        {url: slide4, title: 'monkey'},
        {url: slide5, title: 'panda'},
    ]
  return (
    <>
    <ImageSlider slides={slides}/>
    </>
  )
}

export default SlidesPage