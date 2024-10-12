import { useGo, useList } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/antd";
import { Descriptions, Flex, Form, InputNumber, Modal, Select } from "antd";
import { APPWRITE, packingUnit, suppliers } from "@/utils/constants";
import { useState } from "react";
import { ItemDescription } from "@/types";
import { convertToDescriptions } from "@/utils/convertToDescription";

export const ClientsPageCreate = () => {
  const go = useGo();

  const { formProps, onFinish } = useForm();

  const handleOnFinish = (value: any) => {
    onFinish({
      ...value,
      order_no: String(Math.floor(1000 + Math.random() * 9000)),
      order_date: new Date().toISOString(),
    });
  };

  const { selectProps: selectPropsItems } = useSelect({
    resource: APPWRITE.ITEM_COLLECTION,
    optionLabel: "name",
    optionValue: "id",
  });

  const { data: itemsList } = useList({
    resource: APPWRITE.ITEM_COLLECTION,
  });

  const [itemDescription, setItemDescription] = useState<
    ItemDescription[] | null
  >(null);

  return (
    <Modal
      okButtonProps={{ form: "create-order-form", htmlType: "submit" }}
      title="New Order"
      open
      onCancel={() => {
        go({
          to: { resource: APPWRITE.ORDER_COLLECTION, action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form
        layout="vertical"
        id="create-order-form"
        {...formProps}
        onFinish={handleOnFinish}
      >
        <Flex
          vertical
          style={{
            margin: "0 auto",
            width: "420px",
          }}
        >
          <Form.Item
            name="supplier_name"
            label="Supplier Name"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              options={suppliers}
              placeholder="Please select a supplier"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            name="itemMaster"
            label="Select Item"
            rules={[{ required: true }]}
          >
            <Select
              options={selectPropsItems.options}
              showSearch
              placeholder="Please select an item"
              filterOption={(input, option) =>
                (String(option?.label) ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={(value) => {
                const selectedItemDescription = itemsList?.data.find(
                  (d) => d.id == value
                );

                setItemDescription(
                  convertToDescriptions(selectedItemDescription)
                );
              }}
            />
          </Form.Item>
          {itemDescription && (
            <Descriptions
              title="Item Details"
              items={itemDescription}
              bordered
              column={2}
              size="small"
              style={{ marginBottom: "1.5rem" }}
            />
          )}
          <Form.Item
            name="packing_unit"
            label="Packing Unit"
            rules={[{ required: true }]}
          >
            <Select
              options={packingUnit}
              showSearch
              placeholder="Please select a packing unit"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            name="order_quantity"
            label="Quantity"
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
