import React from "react";
import { Card } from "antd";

const Product: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <h3>Product</h3>
    <p>Мама я в Дубае</p>
    <p>Мама я в Дубае</p>
  </Card>
);

export default Product;
