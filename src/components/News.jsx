import { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import axios from "axios";

const { Text, Title } = Typography;
const { Option } = Select;


const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;



const News = ({ simplified }) => {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  console.log(`cryptoNews.value`, cryptoNews?.value);

  if (!cryptoNews?.value) return "Loading...";

  const demoImage =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  return (
    <div className="news">
      <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <center>
          <h1 style={{marginTop:'10px'}}>Show the latest news about certain cryptocurrency </h1>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="childre"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
            }
          >
            {console.log(`selected newsCategory: `,newsCategory)}
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoData?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
          </center>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {" "}
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
                {/* <img src={news?.image?.thumbnail?.contentUrl} alt="news" /> */}
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)} ... `
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default News;
