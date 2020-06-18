import React, { Component } from "react";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../css/covidcards.css";

export default class CovidCards extends Component {
  render() {
    if (this.props.for === "global") {
      let items = [];
      for (let key in this.props.data) {
        let heading = key.replace(/([a-z])([A-Z])/g, "$1 $2");
        let val = this.props.data[key]
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        items.push(
          <Col
            sm={4}
            xs={6}
            key={heading}
            className="my-sm-1 my-2 mx-auto d-flex justify-content-center"
          >
            <Badge
              className="text-center covidBadge px-5 px-sm-3"
              variant="success"
            >
              <div className="Heading">{heading}</div>
              {val}
            </Badge>
          </Col>
        );
      }
      items.sort(function (a, b) {
        if (a.key.indexOf("Total") !== -1) {
          return -1;
        } else if (b.key.indexOf("Total") === -1) {
          return 1;
        }
      });

      // console.log(items);
      return (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <Card bg="primary" text="white" border="none" className="covidCard">
              <Card.Header className="Header text-center" as="h5">
                Global Records
              </Card.Header>
              <Card.Body className="Body">
                <Container>
                  <Row className="py-2 py-sm-2">{items}</Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        </React.Fragment>
      );
    } else if (this.props.for == "country") {
      // console.log("country");
      var items = [];
      for (let key in this.props.data) {
        if (key.indexOf("Total") !== -1 || key.indexOf("New") !== -1) {
          let heading = key.replace(/([a-z])([A-Z])/g, "$1 $2");
          let val = this.props.data[key]
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          items.push(
            <Col
              sm={4}
              xs={6}
              key={heading}
              className="my-sm-1 my-2 mx-auto d-flex justify-content-center"
            >
              <Badge
                className="text-center covidBadge px-5 px-sm-3"
                variant="success"
              >
                <div className="Heading">{heading}</div>
                {val}
              </Badge>
            </Col>
          );
        }
      }
      items.sort(function (a, b) {
        if (a.key.indexOf("Total") !== -1) {
          return -1;
        } else if (b.key.indexOf("Total") === -1) {
          return 1;
        }
      });

      // console.log(items);
      return (
        <React.Fragment>
          <Col
            lg={6}
            md={12}
            sm={12}
            xs={12}
            className="d-flex justify-content-center"
          >
            <Card
              bg="primary"
              text="white"
              border="none"
              className="covidCard my-2"
            >
              <Card.Header className="Header text-center" as="h5">
                {this.props.data.Country}
              </Card.Header>
              <Card.Body className="Body">
                <Container>
                  <Row className="py-2 py-sm-2">{items}</Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    return <h4>This is test Text</h4>;
  }
}
