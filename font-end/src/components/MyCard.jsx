import nike from '../assets/nike.png';
import { Card } from 'react-bootstrap';

function MyCard({ children }) {
    return (
        <Card className='my-card' style={{ width: '22rem', height: '38rem', borderRadius: '2rem', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', border: 'none' }}>
            <Card.Body>
                <Card.Title>
                    <img src={nike} alt="Nike logo" style={{ width: '4rem' }} />
                </Card.Title>
                <div>{children}</div>
            </Card.Body>
        </Card> 
    )
}

export default MyCard;