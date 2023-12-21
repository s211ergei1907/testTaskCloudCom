import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, InputNumber } from "antd";
import styles from "./ModalUpdateCard.module.scss";
import { axiosConfig } from "../../axios";
import { useNavigate } from "react-router-dom";

interface ModalUpdateCardProps {
  idParam: string | undefined;
}
const ModalUpdateCard: React.FC<ModalUpdateCardProps> = ({ idParam }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [productId, setProductId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (open && productId) {
      axiosConfig
        .get(`products/${productId}`)
        .then((response) => {
          const productData = response.data;
          form.setFieldsValue(productData);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    }
  }, [open, productId, form]);

  const onFinish = (values: any) => {
    if (values && values.images) {
      axiosConfig
        .put(`products/${productId}`, { ...values })
        .then((response) => {
          console.log("Успешный обновлено:", response.data);
          navigate("/products");
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } else {
      console.error("Ошибка: свойство 'images' отсутствует в values");
    }

    setOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Ошибка:", errorInfo);
  };

  const idNumber: number | null =
    idParam !== undefined ? parseInt(idParam, 10) : null;
  return (
    <>
      <Button
        className={styles.button}
        type="primary"
        onClick={() => {
          setProductId(idNumber);
          setOpen(true);
        }}
      >
        Обновить карточку
      </Button>
      <Modal
        title="Обновить карточку"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setProductId(null);
          setOpen(false);
        }}
        width={1500}
      >
        <Form
          form={form}
          name="editProductForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Пожалуйста напишите название",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder={"Напишите название товара"} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Пожалуйста напишите описание товара",
              },
            ]}
          >
            <Input.TextArea
              placeholder={"Пожалуйста напишите описание товара"}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Пожалуйста напишите цену товара",
                min: 0.1,
                type: "number",
              },
            ]}
          >
            <InputNumber placeholder={"30"} />
          </Form.Item>

          <Form.Item
            label="Discount Percentage"
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: "Пожалуйста напишите процент скидки от 1 до 100",
                min: 0.1,
                max: 100,
                type: "number",
              },
            ]}
          >
            <InputNumber placeholder={"20"} />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Пожалуйста поставьте рейтинг от 1 до 5",
                type: "number",
                min: 0.1,
                max: 5,
              },
            ]}
          >
            <InputNumber placeholder={"3.76"} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите кол-во от 1",
                min: 1,
                type: "number",
              },
            ]}
          >
            <InputNumber placeholder={"30"} />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Пожалуйста укажите бренд" }]}
          >
            <Input placeholder={"пример: Baking Food Items"} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Пожалуйста укажите категорию" },
            ]}
          >
            <Input
              placeholder={"пример: skincare, groceries, home-decoration"}
            />
          </Form.Item>

          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите ссылку на картинку",
              },
            ]}
          >
            <Input
              placeholder={
                "Вставьте картинку, формат(без кавычек): https://i.dummyjson.com/data/products/17/thumbnail.jpg"
              }
            />
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите ссылки на картинки",
              },
            ]}
          >
            <Input.TextArea
              placeholder={
                "Вставьте ссылки на картинки, формат (без кавычек):" +
                "\nhttps://i.dummyjson.com/data/products/17/1.jpg," +
                "\nhttps://i.dummyjson.com/data/products/17/3.jpg," +
                "\nhttps://i.dummyjson.com/data/products/17/3.jpg"
              }
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateCard;
