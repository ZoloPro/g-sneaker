import { Col, Row, Button, ButtonToolbar } from 'react-bootstrap'
import './App.css'
import { useState, useEffect } from 'react'
import MyCard from './components/MyCard';
import axiosClient from './axios/axios-client';
import plus from './assets/plus.png';
import minus from './assets/minus.png';
import trash from './assets/trash.png';
import check from './assets/check.png';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // console.log(cartItems);

  useEffect(() => {
    getCardItems();
    getProducts();
  }, []);

  useEffect(() => {
    calTotalPrice();
  }, [cartItems]);

  function getCardItems() {
    // Lấy dữ liệu từ LocalStorage theo key 'cart'
    const itemsData = localStorage.getItem('cart');

    if (itemsData) {
      // Chuyển dữ liệu từ JSON thành đối tượng JavaScript
      const items = JSON.parse(itemsData);
      setCartItems(items);
    }
  }

  function getProducts() {
    axiosClient.get('/products')
      .then((response) => {
        setProducts(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function calTotalPrice() {
    let total = 0;
    cartItems.forEach(item => total += (item.price * item.qty));
    setTotalPrice(total.toFixed(2));
  }

  function addToCart(item) {
    item.qty = 1;
    let newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  }

  function increaseQty(item) {
    let newCartItems = [...cartItems]; // Tạo bản sao của mảng
    let i = newCartItems.findIndex((cartItem => cartItem.id === item.id));
    newCartItems[i] = { ...newCartItems[i], qty: newCartItems[i].qty + 1 }; // Thay đổi giá trị qty
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  }

  function decreaseQty(item) {
    let newCartItems = [...cartItems]; // Tạo bản sao của mảng
    let i = newCartItems.findIndex((cartItem => cartItem.id === item.id));
    newCartItems[i] = { ...newCartItems[i], qty: newCartItems[i].qty - 1 }; // Thay đổi giá trị qty

    if (newCartItems[i].qty === 0) {
      newCartItems = newCartItems.filter(cartItem => cartItem.id !== item.id); // Loại bỏ phần tử có qty = 0
    }

    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  }

  function removeFromCart(item) {
    let newCartItems = [...cartItems];
    newCartItems = newCartItems.filter(cartItem => cartItem.id !== item.id); // Loại bỏ phần tử có qty = 0
    setCartItems(newCartItems);
  }

  return (
    <div className="d-flex align-items-center justify-content-center app-background" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <MyCard>
            <h4>Our Prouducts</h4>
            <div className="overflow-y-auto" style={{ maxHeight: '30rem' }}>
              {products.map(product => {
                let isInCart = cartItems.some(item => item.id === product.id);

                return (
                  <div key={product.id} className="py-4">
                    <div style={{ backgroundColor: product.color, borderRadius: '2rem' }}>
                      <img src={product.image} alt="" style={{ width: '100%', transform: 'rotate(330deg)' }} />
                    </div>
                    <h5 className="my-4 fw-bold">{product.name}</h5>
                    <p style={{ fontWeight: 200 }}>{product.description}</p>
                    <Row className='align-items-center'>
                      <Col className='fw-bold fs-5'>${product.price}</Col>
                      <Col>
                        {isInCart
                          ? <div className='product-check-container'><img src={check} alt="" className='product-check-icon' /></div>
                          : <button className='product-add-button' onClick={() => addToCart(product)}>ADD TO CART</button>}
                      </Col>
                    </Row>
                  </div>
                )
              })}
            </div>
          </MyCard>
        </Col>
        <Col>
          <MyCard>
            <Row>
              <Col>
                <h4>Your cart</h4>
              </Col>
              <Col>
                <h4 className='text-end'>${totalPrice}</h4>
              </Col>
            </Row>
            <div>
              <div className="overflow-y-auto" style={{ maxHeight: '30rem' }}>
                {cartItems.length === 0
                  ? <p>Your cart is empty.</p>
                  : cartItems.map(item => {
                    return (
                      <div key={item.id} className="py-4">
                        <Row>
                          <Col className='col-4'>
                            <div style={{ backgroundColor: item.color, borderRadius: '10rem', position: 'relative', width: '6rem', height: '6rem' }}>
                              <img src={item.image} alt="" style={{ width: '7rem', position: 'absolute', top: '-20px', right: '0', transform: 'rotate(330deg)' }} />
                            </div>
                          </Col>
                          <Col>
                            <p>{item.name}</p>
                            <h5>${item.price}</h5>
                            <Row>
                              <Col>
                                {console.log(item.qty)}
                                <button className='qty-button' onClick={() => increaseQty(item)}><img src={plus} alt="" className='qty-button-icon' /></button>
                                <span className='mx-2'>{item.qty}</span>
                                <button className='qty-button' onClick={() => decreaseQty(item)}><img src={minus} alt="" className='qty-button-icon' /></button>
                              </Col>
                              <Col>
                                <button className="trash-button" onClick={() => removeFromCart(item)}><img src={trash} alt="" className='trash-button-icon' /></button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    )
                  })}
              </div>
            </div>
          </MyCard>
        </Col>
      </Row>
    </div>
  )
}

export default App
