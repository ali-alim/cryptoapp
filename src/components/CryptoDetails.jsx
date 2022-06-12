import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  FallOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "./../services/cryptoApi";
import { useGetCryptoHistoryQuery } from "./../services/cryptoApi";

const { Title, Text } = Typography;


const CryptoDetails = () => {
  let { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  if(isFetching) return 'Loading...';

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  console.log('Timeperiod:', timePeriod)
  {
    console.log(`price_change_percentage_1y: `, data?.market_data.ath.usd);
  }
  {
    console.log(`monacemebi: `, data);
  }

  const stats = [
    {
      title: "Rank",
      value: data?.market_data.market_cap_rank,
      icon: <NumberOutlined />,
    },
    {
      title: "Price to USD",
      value: `$ ${
        data?.market_data.current_price.usd &&
        data?.market_data.current_price.usd
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Total Volume",
      value: `$ ${
        data?.market_data.total_volume.usd &&
        millify(data?.market_data.total_volume.usd)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        data?.market_data.market_cap.usd &&
        millify(data?.market_data.market_cap.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-low price",
      value: `$ ${
        data?.market_data.atl.usd && millify(data?.market_data.atl.usd)
      }`,
      icon: <FallOutlined />,
    },
    {
      title: "All-time-high price",
      value: `$ ${
        data?.market_data.ath.usd && millify(data?.market_data.ath.usd)
      }`,
      icon: <TrophyOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${
        data?.market_data.circulating_supply &&
        millify(data?.market_data.circulating_supply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Supply Limit",
      value: `${
        data?.market_data.max_supply &&
        millify(data?.market_data.max_supply)
      }`,
      icon: <WarningOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.name} ({data?.symbol}) Price
        </Title>
        <p>
          {data?.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </Col>


      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {data?.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {data?.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats"><span>{value}</span></Text>
            </Col>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
