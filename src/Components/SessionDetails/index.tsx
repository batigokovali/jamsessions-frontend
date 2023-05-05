import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

export const SessionDetails = () => {
  return (
    <Container className="mt-5">
      <Card.Img variant="top" src="holder.js/100px180" />

      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Container>
  );
};
