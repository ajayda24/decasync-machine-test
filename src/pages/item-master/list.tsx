import type { PropsWithChildren } from "react";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  NumberField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Flex, Input, Select, Table, Typography } from "antd";
import { API_URL, APPWRITE } from "@/utils/constants";
import { getRandomColorFromString } from "@/utils/get-random-color";
import type { Account } from "@/types";
import { Link } from "react-router-dom";

export const AccountsPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters, sorters } = useTable<Account>();

  // const { selectProps: companyNameSelectProps } = useSelect({
  //   resource: "accounts",
  //   optionLabel: "company_name",
  //   optionValue: "company_name",
  // });

  // const { selectProps: selectPropsOwnerName } = useSelect({
  //   resource: "accounts",
  //   optionLabel: "owner_name",
  //   optionValue: "owner_name",
  // });

  return (
    <>
      <List
        title="Item Master"
        headerButtons={() => {
          return (
            <CreateButton
              size="large"
              onClick={() =>
                go({
                  to: { resource: APPWRITE.ITEM_COLLECTION, action: "create" },
                  options: { keepQuery: true },
                })
              }
            >
              New Item
            </CreateButton>
          );
        }}
      >
        <Table
          {...tableProps}
          rowKey={"item_no"}
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: true,
          }}
          scroll={{ x: 960 }}
        >
          <Table.Column
            title="Item No."
            dataIndex="item_no"
            key="item_no"
            width={80}
            defaultSortOrder={getDefaultSortOrder("item_no", sorters)}
            defaultFilteredValue={getDefaultFilter("item_no", filters, "in")}
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Input placeholder="Search ID" />
                </FilterDropdown>
              );
            }}
          />
          <Table.Column
            title="Name"
            dataIndex="name"
            key="name"
            sorter
            defaultSortOrder={getDefaultSortOrder("name", sorters)}
          />
          <Table.Column
            title="Inventry Location"
            dataIndex="inventory_location"
            key="inventory_location"
            sorter
            defaultSortOrder={getDefaultSortOrder("owner_name", sorters)}
            render={(value) => (
              <Link to={value} target="_blank">
                <Typography.Link ellipsis={true}>{value}</Typography.Link>
              </Link>
            )}
          />
          <Table.Column title="Brand" dataIndex="brand" key="brand" />
          <Table.Column title="Category" dataIndex="category" key="category" />
          <Table.Column title="Supplier" dataIndex="supplier" key="supplier" />
          <Table.Column
            title="Stock Unit"
            dataIndex="stock_unit"
            key="stock_unit"
          />
          <Table.Column
            title="Unit Price"
            dataIndex="unit_price"
            key="unit_price"
            width={120}
            align="end"
            render={(price) => (
              <NumberField
                value={price}
                options={{ style: "currency", currency: "INR" }}
              />
            )}
          />
          <Table.Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(value) => (
              <Typography.Text>{String(value).toUpperCase()}</Typography.Text>
            )}
          />
          <Table.Column
            title="Actions"
            key="actions"
            fixed="right"
            align="end"
            width={106}
            render={(_, record: Account) => {
              return (
                <Flex align="center" gap={8}>
                  <EditButton
                    hideText
                    recordItemId={record.id}
                    // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                    icon={<EyeOutlined />}
                  />
                  <DeleteButton hideText recordItemId={record.id} />
                </Flex>
              );
            }}
          />
        </Table>
      </List>
      {children}
    </>
  );
};
