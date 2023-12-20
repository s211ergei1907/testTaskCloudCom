import React, { useEffect, useState } from "react";
import { Card, Modal } from "antd";
import { axiosConfig } from "../../axios";
import { useNavigate } from "react-router-dom";
import { IProduct } from "./Products.type";
import ModalWindow from "../../components/ModalCreateCard/ModalCreateCard";
import product from "../Product/Product";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const clickOnCart = (id: number) => {
    navigate(`/product/${id}`);
  };

  const fetchResultProducts = async () => {
    try {
      const { data } = await axiosConfig.get(`products`);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching result Products:", error);
    }
  };

  useEffect(() => {
    fetchResultProducts();
  }, []);

  //TODO перенести стили
  return (
    <>
      <ModalWindow />

      <div
        style={{
          display: "grid",
          gap: "40px",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {products.map(({ id, thumbnail, title, description, price }, index) => (
          <Card
            key={index}
            onClick={() => clickOnCart(id)}
            hoverable
            style={{ width: 280, margin: "0 auto", maxWidth: "1100px" }}
            cover={
              <img alt="example" src={thumbnail} style={{ height: 200 }} />
            }
          >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>
              Цена: <span style={{ fontWeight: "bold" }}>{price}$</span>
            </p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
