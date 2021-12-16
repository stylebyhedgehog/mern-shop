import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import {listProducts} from '../../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productList)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return loading ? (
    <div>Загрузка</div>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
