import React from 'react';
import MyCustomers from './MyCustomers';
import { Container, Row, Col, Card } from 'react-bootstrap';

function MainSection() {
  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h4" className="bg-primary text-white">
              My Customers
            </Card.Header>
            <Card.Body>
              <MyCustomers />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MainSection;
