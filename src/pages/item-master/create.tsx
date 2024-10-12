import { type HttpError, useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Flex, Form, Input, InputNumber, Modal, Select, Switch } from "antd";
import InputMask from "react-input-mask";
import { FormItemUploadLogoDraggable } from "@/components/form";
import type { Account, AccountForm } from "@/types";
import { APPWRITE, suppliers } from "@/utils/constants";

export const AccountsPageCreate = () => {
  const go = useGo();

  const { formProps } = useForm<Account, HttpError, AccountForm>();

  return (
    <Modal
      okButtonProps={{ form: "create-account-form", htmlType: "submit" }}
      title="New Item"
      open
      onCancel={() => {
        go({
          to: { resource: APPWRITE.ITEM_COLLECTION, action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form
        layout="vertical"
        id="create-account-form"
        {...formProps}
        onFinish={(values) => {
          return formProps.onFinish?.({
            ...values,
            item_no: String(Math.floor(1000 + Math.random() * 9000)),
            status: values?.status ? "enabled" : "disabled",
          });
        }}
      >
        <Flex gap={40}>
          {/* <FormItemUploadLogoDraggable /> */}
          <Flex
            vertical
            style={{
              margin: "0 auto",
              width: "420px",
            }}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="inventory_location"
              label="Inventory Location"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="supplier"
              label="Supplier"
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
              name="stock_unit"
              label="Stock Unit"
              rules={[{ required: true, type: "number", min: 1 }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="unit_price"
              label="Unit Price"
              rules={[{ required: true, type: "number", min: 1 }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Status" name="status" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
