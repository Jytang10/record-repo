import React from 'react';
import { Container, Row, Card, CardImg, Button, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './about.css';
class About extends React.Component {
  render() {
    return (
      <Container>
        <Card className="mt-4 align-items-center">
          <CardImg top className="about-image" src="/images/about.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Thank you for visiting Record Repo!</CardTitle>
            <CardText>Hi! My name is James Tang, a Front End Developer. Record Repo was initially started as a practice project to continue learning React, but it quickly became one of my personal favorite projects to work on and improve. It was the first full-stack application that I developed, utilizing JavaScript, React and CSS for the Front End component display while PHP and MySQL were used to manage and store data in the database. I chose a vinyl record theme due to my love of music and J-Pop. Thank you again for your time.</CardText>
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
