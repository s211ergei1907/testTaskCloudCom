import { Button, Card, Carousel } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../axios";
import styles from "./Product.module.scss";
import { ProductType } from "./Product.type";
import ModalUpdateCard from "../../components/ModalUpdateCard/ModalUpdateCard";

export const Product: React.FC = () => {
  const paramsId = useParams();
  const { idParam } = paramsId;
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    try {
      await axiosConfig.delete(`products/${idParam}`);
      console.log("Товар успешно удалён");
      navigate("/products");
    } catch (error) {
      console.log("Не получилось удалить", error);
    }
  };

  const [product, setProduct] = useState<ProductType | undefined>(undefined);

  const fetchResultProducts = async () => {
    try {
      const { data } = await axiosConfig.get<ProductType>(`product/${idParam}`);
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Ошибка при получении продукта:", error);
    }
  };

  useEffect(() => {
    fetchResultProducts();
  }, []);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.item}>
      <div className={styles.card}>
        <Card
          hoverable
          style={{ width: 280, margin: "0 auto" }}
          cover={
            <Carousel>
              {product.images &&
                product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      alt={`image-${index}`}
                      src={image}
                      style={{
                        height: 200,
                        width: "100%",
                        filter: "brightness(70%)",
                      }}
                    />
                  </div>
                ))}
            </Carousel>
          }
        >
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Скидка: {product.discountPercentage} %</p>
          <p>Рейтинг: {product.rating} </p>
          <p>Количество товара: {product.stock}</p>
          <p>Бренд: {product.brand}</p>
          <p>Категория: {product.category}</p>
          <p>
            Цена: <span style={{ fontWeight: "bold" }}>{product.price}$</span>
          </p>
        </Card>
      </div>

      <div className={styles.buttonsBlock}>
        <Button
          className={styles.onClickBtnDelete}
          onClick={() => handleDeleteUser()}
          type="primary"
        >
          Удалить
        </Button>
        <ModalUpdateCard idParam={idParam} />
      </div>
    </div>
  );
};
