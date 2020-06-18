import React, { Component } from "react";
import CovidCards from "./components/CovidCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import FlipMove from "react-flip-move";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      staticData: null,
      isLoading: true,
      error: null,
      currentPage: 0,
      pageLimit: 4,
      pageIndex: 0,
      viewMoreLoading: false,
      searchText: "",
      searchLoading: false,
      searchAnimationStyle: {},
      searchClicked: false,
    };
    this.cardsIncrease = this.cardsIncrease.bind(this);
    // this.change = this.change.bind(this);
  }
  async componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    let data = await response.json();
    data.Countries = this.sortByKey(data.Countries, "TotalConfirmed");
    this.setState({ data: data, isLoading: false, staticData: data });
    this.cardsIncrease(false);
    // this.setState({ pageIndex: this.state.pageIndex + 1 });
  }

  // searchByCountry(searchQuery) {
  //   let tempData = JSON.parse(JSON.stringify(this.state.staticData));
  //   tempData.Countries = tempData.Countries.filter(
  //     (country) => country && country.includes(searchQuery)
  //   );
  //   this.setState({
  //     currentPage: pageNumber,
  //     data: tempData,
  //   });
  //   console.log(tempData.Countries);
  // }

  viewMore = (pageNumber) => {
    // console.log("view more start", this.state.staticData);
    let tempData = JSON.parse(JSON.stringify(this.state.staticData));
    tempData.Countries = tempData.Countries.splice(
      0,
      this.state.pageLimit * pageNumber
    );
    this.setState({
      currentPage: pageNumber,
      data: tempData,
    });
    // console.log("pageNumber", this.state);
  };

  cardsIncrease(normal) {
    // console.log("CardsIncease", this.state.pageIndex);
    if (normal) this.setState({ viewMoreLoading: true });
    setTimeout(() => {
      this.setState({ pageIndex: this.state.pageIndex + 1 }, () => {
        this.viewMore(this.state.pageIndex);
        this.setState({ viewMoreLoading: false });
      });
    }, 10);
  }

  sortByKey(array = [], key) {
    return array.sort(function (a, b) {
      var keyA = a[key],
        keyB = b[key];
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
  }

  searchClicked() {
    setTimeout(() => {
      this.setState({ searchClicked: true });
    }, 20);
  }
  searchBlur() {
    setTimeout(() => {
      this.setState({ searchClicked: false });
    }, 20);
  }

  searchHandle(e) {
    if (e.target.value !== "") {
      this.setState({ searchLoading: true });
      let tempData = JSON.parse(JSON.stringify(this.state.staticData));
      tempData.Countries = tempData.Countries.filter((value) => {
        if (
          value.Country.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1
        )
          return true;
        else return false;
      });

      setTimeout(() => {
        this.setState({ data: tempData }, () => {
          this.setState({ searchLoading: false });
        });
      }, 100);
    } else {
      setTimeout(() => {
        this.viewMore(1);
      }, 10);
      console.log(this.state.data);
    }
  }

  render() {
    const { json, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <h1 className="font-italic">Loading......</h1>
        </div>
      );
    }
    var jsxit = this.state.data["Countries"].map(function (country) {
      return <CovidCards data={country} for="country" />;
    });

    let searchMessage = "";
    if (this.state.searchLoading == true) {
      searchMessage = "Loading...";
    } else if (Array.isArray(jsxit) && jsxit.length === 0) {
      searchMessage = "Record not found";
    }

    console.log(searchMessage);

    let searchClassName = "m-auto p-1";
    if (this.state.searchClicked) {
      searchClassName = "m-auto p-1 click";
    } else {
      searchClassName = "m-auto p-1";
    }

    // console.log(jsxit);
    return (
      <React.Fragment>
        <Container fluid>
          <Row className="my-3">
            <Col lg={6} sm={12}>
              <CovidCards data={this.state.data["Global"]} for="global" />
            </Col>
            <Col lg={6} sm={12}>
              <div className="d-flex justify-content-center my-3">
                <h2 className="my-4 bgULY" variant="primary">
                  View by Country
                </h2>
              </div>
              <div className="d-flex justify-content-center my-3 mb-4 mx-auto">
                <div className={searchClassName} id="search">
                  <span className="d-none d-sm-inline-block">
                    <FontAwesomeIcon
                      icon={faSearch}
                      color="#edf2f4"
                      size="lg"
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Search here"
                    onChange={this.searchHandle.bind(this)}
                    onFocus={this.searchClicked.bind(this)}
                    onBlur={this.searchBlur.bind(this)}
                  />
                </div>
              </div>
              <div className="my-3 d-flex justify-content-center">
                {searchMessage !== "" ? (
                  <h3 className="font-italic position-relative">
                    {searchMessage}
                  </h3>
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col>
              <hr className="divider" />
            </Col>
          </Row>
        </Container>
        <Container fluid className="my-2">
          <Row>{jsxit}</Row>
        </Container>
        <div className="d-flex justify-content-center px-5 my-2 mrginBottom">
          <button
            type="button"
            onClick={() => this.cardsIncrease(true)}
            className="btn btn-primary btn-lg"
          >
            {this.state.viewMoreLoading !== true ? "View more" : "Loading..."}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
