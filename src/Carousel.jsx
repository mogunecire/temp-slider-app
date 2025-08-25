import { useState, useEffect } from 'react'
import { shortList, list, longList } from './data'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
const Carousel = () => {
  const [people, setPeople] = useState(list)
  const [currentPerson, setCurrentPerson] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      return (oldPerson - 1 + people.length) % people.length
    })
  }
  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      return (oldPerson + 1) % people.length
    })
  }

  useEffect(() => {
    if (!isAutoplay) return
    let sliderId = setInterval(() => {
      nextSlide()
    }, 3500)
    return () => {
      clearInterval(sliderId)
    }
  }, [currentPerson, isAutoplay])
  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
            <button
              type="button"
              className="btn"
              style={{
                display: 'flex',
                margin: '0 auto',
                marginTop: '2rem',
              }}
              onClick={() => {
                setIsAutoplay(!isAutoplay)
                console.log(isAutoplay)
              }}
            >
              {isAutoplay ? 'stop autoplay' : 'start autoplay'}
            </button>
          </article>
        )
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  )
}
export default Carousel
