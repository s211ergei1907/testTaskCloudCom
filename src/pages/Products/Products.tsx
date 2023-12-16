import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { axiosConfig } from "../../axios";

interface ProductsData {
  // интерфейс данных, соответствующий структуре ответа от сервера

  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);

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

  useEffect(() => {
    console.log("Products", products);
  }, [products]);
  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {products.map(({ thumbnail, title, description, price }) => (
        <Card
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
