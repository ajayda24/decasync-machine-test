import { useNavigation } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  NumberField,
  Show,
  ShowButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Card, Divider, Flex, Form, Table, Typography } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  ExportOutlined,
  BankOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import {
  FormItemEditableInputText,
  FormItemEditableSelect,
} from "@/components/form";
import type { Invoice } from "@/types";
import { APPWRITE, packingUnit, suppliers } from "@/utils/constants";

export const ClientsPageEdit = () => {
  const { list } = useNavigation();

  const {
    formProps,
    query: queryResult,
    onFinish,
  } = useForm({
    redirect: false,
  });

  const handleOnFinish = (value: any) => {
    onFinish({
      ...value,
      order_quantity: Number(value?.order_quantity),
    });
  };

  const { selectProps: selectPropsItems } = useSelect({
    resource: APPWRITE.ITEM_COLLECTION,
    optionLabel: "name",
    optionValue: "id",
  });

  const isLoading = queryResult?.isLoading;

  const queryResultData = queryResult?.data?.data;
  console.log(queryResultData, "queryresult");

  if (isLoading) return null;

  return (
    <Show
      title={`Order - #${queryResultData?.order_no}`}
      headerButtons={() => false}
      contentProps={{
        styles: {
          body: {
            padding: 0,
          },
        },
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Row>
          <Col span={24}>
            <Flex gap={16} justify="flex-end">
              <DeleteButton
                type="primary"
                style={{
                  marginTop: "16px",
                }}
                onSuccess={() => {
                  list(APPWRITE.ORDER_COLLECTION);
                }}
              >
                Delete Order
              </DeleteButton>
            </Flex>
          </Col>
        </Row>
        <Row
          gutter={32}
          style={{
            marginTop: "32px",
          }}
        >
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Card
              bordered={false}
              styles={{ body: { padding: 0 } }}
              title={
                <Flex gap={12} align="center">
                  {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
                  <ShopOutlined />
                  <Typography.Text>Order info</Typography.Text>
                </Flex>
              }
            >
              <FormItemEditableSelect
                loading={isLoading}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<BankOutlined />}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                editIcon={<ExportOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select supplier",
                  options: suppliers,
                  defaultValue: queryResultData?.supplier_name,
                }}
                formItemProps={{
                  name: "supplier_name",
                  getValueProps: (value) => {
                    return {
                      value: value?.value,
                      label: value?.label,
                    };
                  },
                  label: "Supplier",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableSelect
                loading={isLoading}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<ShopOutlined />}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                editIcon={<ExportOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select item",
                  options: selectPropsItems.options,
                  defaultValue: queryResultData?.itemMaster?.name,
                }}
                formItemProps={{
                  name: "itemMaster",
                  getValueProps: (value) => {
                    return {
                      value: value?.value,
                      label: value?.label,
                    };
                  },
                  label: "Item",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableSelect
                loading={isLoading}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<BankOutlined />}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                editIcon={<ExportOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select Packing Unit",
                  options: packingUnit,
                  defaultValue: queryResultData?.packing_unit,
                }}
                formItemProps={{
                  name: "packing_unit",
                  getValueProps: (value) => {
                    return {
                      value: value?.value,
                      label: value?.label,
                    };
                  },
                  label: "Packing Unit",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableInputText
                loading={isLoading}
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<UserOutlined />}
                placeholder="Quantity"
                formItemProps={{
                  name: "order_quantity",
                  label: "Quantity",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
            </Card>
          </Col>

          <Col xs={{ span: 24 }} xl={{ span: 16 }}>
            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
                  <ContainerOutlined />
                  <Typography.Text>Item Info</Typography.Text>
                </Flex>
              }
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: 0,
                },
              }}
            >
              <Table
                dataSource={[queryResultData?.itemMaster]}
                pagination={false}
                loading={isLoading}
                rowKey={"item_no"}
              >
                <Table.Column
                  title="Item  No."
                  dataIndex="item_no"
                  key="item_no"
                  width={72}
                />
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column
                  title="Stock Unit"
                  dataIndex="stock_unit"
                  key="stock_unit"
                />
                <Table.Column
                  title="Unit Price"
                  dataIndex="unit_price"
                  key="unit_price"
                />
                <Table.Column
                  key="actions"
                  width={64}
                  render={(_, record: Invoice) => {
                    return (
                      <Flex align="center" gap={8}>
                        <ShowButton
                          hideText
                          resource="invoices"
                          recordItemId={record.id}
                          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                          icon={<ExportOutlined />}
                        />
                      </Flex>
                    );
                  }}
                />
              </Table>
            </Card>
            <Card
              bordered
              title={
                <Flex gap={12} align="center">
                  {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
                  <ContainerOutlined />
                  <Typography.Text>Total Amount</Typography.Text>
                </Flex>
              }
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: 0,
                },
              }}
            >
              <Table
                dataSource={[queryResultData]}
                pagination={false}
                loading={isLoading}
                rowKey={"id"}
              >
                <Table.Column
                  title="Quantity"
                  dataIndex="order_quantity"
                  key="order_quantity"
                />
                <Table.Column
                  title="Net Amount"
                  dataIndex="name"
                  key="name"
                  render={(_, row) => (
                    <NumberField
                      value={row?.order_quantity * row?.itemMaster?.unit_price}
                      options={{ style: "currency", currency: "INR" }}
                    />
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </Form>
    </Show>
  );
};
