import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import axios from "axios";

const Cryptocurrencies = ({simplified}) => {
  //   const { data, isFetching } = useGetCryptosQuery(10);
  //   console.log(cryptosList);
  //   console.log(data);
  //   const [cryptos, setCryptos] = useState(cryptosList);
  //   console.log(cryptos);
  const count = simplified ? 10 : 100;
  
  const [rawData, setRawData] = useState([])
  const [cryptos, setCryptos] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('')

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setRawData(response.data)
        setCryptos(response.data)
      })
      .catch((error) => {
        console.log(error);
      });


  },[]);

  useEffect(() => {
    const filteredData = rawData?.filter((coin) => coin.name.toLowerCase().includes(
      searchTerm.toLowerCase()))
      setCryptos(filteredData)
  },[searchTerm])

  console.log(`search term:`, searchTerm)
  console.log(`cryptos: `,cryptos)

  return (
    <>
    <div className="search-crypto">
      <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin, index) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                title={`${index+1}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.image} />}
                hoverable
              >
                <p>Price: {millify(coin.current_price)}</p>
                <p>Market Cap: {millify(coin.market_cap)}</p>
                <p>
                  Daily Change: {millify(coin.price_change_24h)}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
