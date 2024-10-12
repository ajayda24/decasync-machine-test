import { BaseRecord } from "@refinedev/core";

export const convertToDescriptions = (data: BaseRecord | undefined) => {
  if (!data) return null;
  return [
    {
      key: "item_no",
      label: "Item No",
      children: data?.item_no,
    },
    {
      key: "name",
      label: "Name",
      children: data?.name,
    },
    {
      key: "brand",
      label: "Brand",
      children: data?.brand,
    },
    {
      key: "category",
      label: "Category",
      children: data?.category,
    },
    {
      key: "supplier",
      label: "Supplier",
      children: data?.supplier,
    },
    {
      key: "stock_unit",
      label: "Stock Unit",
      children: data?.stock_unit,
    },
    {
      key: "unit_price",
      label: "Unit Price",
      children: data?.unit_price,
    },
    {
      key: "status",
      label: "Status",
      children: data?.status,
    },
    {
      key: "inventory_location",
      label: "Inventory Location",
      children: data?.inventory_location,
      span: 2,
    },
  ];
};
