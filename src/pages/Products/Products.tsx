import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { axiosConfig } from "../../axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "./Products.type";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);

  const clickOnCart = () => {
    navigate("/product/:id");
  };

  const fetchResultDiscipline = async () => {
    try {
      const { data } = await axiosConfig.get(`products`);
      setProducts(data.products);
      console.log(data.products);
      console.log("Products", products);
    } catch (error) {
      console.error("Error fetching result Products:", error);
    }
  };

  useEffect(() => {
    fetchResultDiscipline();
  }, []);

  //TODO перенести стили
  return (
    <div
      style={{
        display: "grid",
        gap: "40px",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {products.map(({ thumbnail, title, description, price }) => (
        <Card
          onClick={clickOnCart}
          hoverable
          style={{ width: 280, margin: "0 auto", maxWidth: "1100px" }}
          cover={<img alt="example" src={thumbnail} style={{ height: 200 }} />}
        >
          <h3>{title}</h3>
          <p>{description}</p>
          <p>
            Цена: <span style={{ fontWeight: "bold" }}>{price}$</span>
          </p>
        </Card>
      ))}
    </div>
  );
};

export default Products;
