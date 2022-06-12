import { useGetCryptosQuery } from "../services/cryptoApi";
import { Typography, Row, Col, Statistic } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "./../components";
const { Title } = Typography;

const Homepage = () => {
  //   const { data, isFetching } = useGetCryptosQuery();
  // const globalStats = data?.data;

  //   if(isFetching) return 'Loading...';

  //   console.log(data);

  return (
    <div className="home">
      <center>
        <Title level={2} className="heading">
          Find a list of top cryptocurrencies and their prices in real time,
          news and more
        </Title>
      </center>

      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Popular Cryptocurrencies in the World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
