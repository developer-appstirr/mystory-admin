import { useState, useEffect } from "react";
// core components
import {
  USERDATEANDCOUNTRY,
  USERDATEANDCOUNTRY_UNREGISTER,
  WEEKLY_MEMBERS,
  WEEKLY_JOURNALS,
  GET_ALL_COUNT,
} from "../state/action-creater/usersAction";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Chart from "chart.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import { countries } from "../Constants/countries";
import Select from "react-select";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import { GET_PRIVACY_POLICY } from "../state/action-creater/usersAction";

const Index = (props) => {
  const [currentCountry, setCurrentCountry] = useState("United States");
  const [currentCountries, setCurrentCountries] = useState("United States");
  const GraphData = useSelector((state) => state.allUsers.GraphData);
  const WeeklyJournal = useSelector((state) => state.allUsers.WeeklyJournal);
  const FamilyMembers = useSelector((state) => state.allUsers.FamilyMembers);
  const UnRegisterGraph = useSelector(
    (state) => state.allUsers.UnRegisterGraph
  );

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const arr = [];
  for (let key in GraphData) {
    arr.push(GraphData[key]);
  }

  let Chartdata = {
    labels: GraphData && Object.keys(GraphData),
    datasets: [
      {
        data: GraphData && arr,
        maxBarThickness: 10,
      },
    ],
  };
  const arrUnRegister = [];
  for (let key in UnRegisterGraph) {
    arrUnRegister.push(UnRegisterGraph[key]);
  }

  let arrUnRegisterChartdata = {
    labels: UnRegisterGraph && Object.keys(UnRegisterGraph),
    datasets: [
      {
        data: UnRegisterGraph && arrUnRegister,
        maxBarThickness: 10,
      },
    ],
  };

  const arrFamily = [];
  for (let key in FamilyMembers) {
    arrFamily.push(FamilyMembers[key]);
  }

  let arrarrFamilyMember = {
    labels: FamilyMembers && Object.keys(FamilyMembers),
    datasets: [
      {
        data: FamilyMembers && arrFamily,
        maxBarThickness: 10,
      },
    ],
  };

  const arrjournals = [];
  for (let key in WeeklyJournal) {
    arrjournals.push(WeeklyJournal[key]);
  }

  let WeeklyJournalChartData = {
    labels: WeeklyJournal && Object.keys(WeeklyJournal),
    datasets: [
      {
        data: WeeklyJournal && arrjournals,
        maxBarThickness: 10,
      },
    ],
  };

  const dispatch = useDispatch();
  useEffect(() => {
    GET_PRIVACY_POLICY();
    dispatch(GET_ALL_COUNT());
    dispatch(WEEKLY_JOURNALS(moment(new Date())?.format("YYYY-MM-DD")));
    dispatch(WEEKLY_MEMBERS(moment(new Date())?.format("YYYY-MM-DD")));
  }, []);

  useEffect(() => {
    dispatch(
      USERDATEANDCOUNTRY(
        moment(new Date())?.format("YYYY-MM-DD"),
        currentCountry?.value
      )
    );
  }, [currentCountry]);

  useEffect(() => {
    dispatch(
      USERDATEANDCOUNTRY_UNREGISTER(
        moment(new Date())?.format("YYYY-MM-DD"),
        currentCountries?.value
      )
    );
  }, [currentCountries]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Weekly
                    </h6>
                    <h2 className="mb-0">New Family Members</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={arrarrFamilyMember}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Weekly
                    </h6>
                    <h2 className="text-white mb-0">New Journals Added</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={WeeklyJournalChartData}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Weekly
                    </h6>
                    <h2 className="text-white mb-0">Registered Users</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <div className="mr-3">
                        <Select
                          className="input-countries"
                          value={currentCountry}
                          placeholder={"Select Country.."}
                          onChange={setCurrentCountry}
                          options={countries}
                        />
                      </div>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line data={Chartdata} options={chartExample1.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Weekly
                    </h6>
                    <h2 className="mb-0">Unregistered Users</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <div className="mr-3">
                        <Select
                          className="input-countries"
                          value={currentCountries}
                          placeholder={"Select Country.."}
                          onChange={setCurrentCountries}
                          options={countries}
                        />
                      </div>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={arrUnRegisterChartdata}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
