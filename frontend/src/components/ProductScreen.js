import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from './elements/Message'
import {
  listProductDetails,
} from '../actions/productActions'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {

      dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Назад
      </Link>
      {loading ? (
          <div>Загрузка</div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Image src={product.image} alt={product.name} fluid />
          </Row>
          <Row>

              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>Цена: {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Описание: {product.description}
                </ListGroup.Item>
              </ListGroup>
            <Col md={3}>
              <Card>

                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Добавить в корзину
                    </Button>
              </Card>
            </Col>
          </Row>
          <Row>

          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
