import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { axiosConfig } from "../../axios";
import { useParams } from "react-router-dom";
import { IProduct } from "../Products/Products.type";

const Product: React.FC = () => {
  const paramsId = useParams();
  const { id } = paramsId;
  const [product, setProduct] = useState<IProduct[]>([]);

  const fetchResultProducts = async () => {
    try {
      const { data } = await axiosConfig.get(`product/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching result Products:", error);
    }
  };

  useEffect(() => {
    fetchResultProducts();
  }, []);

  return (
    <div style={{ height: "calc(85vh)", margin: "0 auto" }}>
      {product.map(
        (
          {
            id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
          },
          index,
        ) => (
          <Card
            key={id}
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{discountPercentage}</p>
            <p>{price}</p>
            <p>{rating}</p>
            <p>{stock}</p>
            <p>{brand}</p>
            <p>{category}</p>
            <p>{thumbnail}</p>
            <p>{thumbnail}</p>
            {/*<img src={`${images[0]}`} alt="" />*/}
          </Card>
        ),
      )}
    </div>
  );
};

export default Product;
