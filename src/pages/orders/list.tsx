import type { PropsWithChildren } from "react";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CreateButton,
  DateField,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  NumberField,
  TextField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { Avatar, Flex, Input, Select, Table, Typography } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { API_URL, APPWRITE } from "@/utils/constants";
import { getRandomColorFromString } from "@/utils/get-random-color";
import type { Client } from "@/types";

export const ClientsPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters, sorters } = useTable<Client>();

  const { selectProps: selectPropsName } = useSelect({
    resource: APPWRITE.ITEM_COLLECTION,
    optionLabel: "name",
    optionValue: "name ",
  });

  return (
    <>
      <List
        title="Purchase Order"
        headerButtons={() => {
          return (
            <CreateButton
              size="large"
              onClick={() =>
                go({
                  to: { resource: APPWRITE.ORDER_COLLECTION, action: "create" },
                  options: { keepQuery: true },
                })
              }
            >
              Add New
            </CreateButton>
          );
        }}
      >
        <Table
          {...tableProps}
          rowKey={"order_no"}
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: true,
          }}
          scroll={{ x: 960 }}
        >
          <Table.Column
            title="Order No"
            dataIndex="order_no"
            key="order_no"
            width={150}
            sorter
            defaultSortOrder={getDefaultSortOrder("order_no", sorters)}
            defaultFilteredValue={getDefaultFilter("order_no", filters, "in")}
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
            title="Date"
            dataIndex="order_date"
            key="order_date"
            sorter
            defaultSortOrder={getDefaultSortOrder("order_date", sorters)}
            render={(data) => <DateField value={data} />}
          />
          <Table.Column
            title="Supplier Name"
            dataIndex="supplier_name"
            key="supplier_name"
            sorter
            defaultSortOrder={getDefaultSortOrder("supplier_name", sorters)}
            defaultFilteredValue={getDefaultFilter(
              "supplier_name",
              filters,
              "in"
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  mode="multiple"
                  placeholder="Search Name"
                  style={{ width: 220 }}
                  {...selectPropsName}
                />
              </FilterDropdown>
            )}
          />

          <Table.Column
            title="Item No."
            dataIndex={["itemMaster", "item_no"]}
            key="itemMaster.item_no"
          />

          <Table.Column
            title="Actions"
            key="actions"
            fixed="right"
            align="end"
            width={106}
            render={(_, record: Client) => {
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
