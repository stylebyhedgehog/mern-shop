import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from './elements/Product'
import Message from './elements/Message'
import Paginate from './elements/Paginate'
import { listProducts } from '../actions/productActions'
import ProductCarousel from "./elements/ProductCarousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <ProductCarousel />
      <h1>Последние товары</h1>
      {loading ? (
        <div>Загрузка</div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
