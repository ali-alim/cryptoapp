import { useGetCryptosQuery } from "../services/cryptoApi";
import { Typography, Row, Col, Statistic } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
    const globalStats = data?.data; 

  if(isFetching) return 'Loading...';

  console.log(data);

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.active_cryptocurrencies} />
          {/* <Statistic title="Total Cryptocurrencies" value="5" /> */}
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={globalStats.markets} />
        </Col>
      </Row>
      <div className="home-heading-container" >
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        
      </div>
    </>
  );
};

export default Homepage;
