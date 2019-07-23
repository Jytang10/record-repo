import React from 'react';
import { Container, Row, Card, CardImg, Button, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './about.css';
class About extends React.Component {
  render() {
    return (
      <Container>
        <Card className="mt-4 align-items-center">
          <CardImg top className="about-image" src="/images/about.jpg" alt="Card image cap" />
          <CardBody>
            <CardText>
                Hi, I&apos;m James Tang and thank you for viewing my project! With a generic online shopping cart as the base,
                I decided to create an online store selling vinyl records. From my time in living in Japan and personal interest in Japanese music,
                I chose to offer J-Pop vinyl records in order to share my interest with others. I used React and Reactstrap to design and display components
                on the front-end, while I used MySQL queries and PHP scripts in order to link and communicate with the back-end to handle data. This was one of my personal favorite projects as I
                had full responsibility of the front-end visual aspect and the back-end data portion of the project, and overall the design and functionality were a joy to create.
                Please feel free to visit my <a href="https://github.com/Jytang10/peanut-gallery">GitHub</a> or <a href="https://jamestang.dev/">Portfolio</a> for more of my projects. Thank you!
            </CardText>
            <Row className="about-row">
              <Link to="/">
                <Button color="success">To Home</Button>
              </Link>
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default About;
