import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { App as AntdApp } from "antd";
import { Header } from "@/components/header";
import {
  AccountsPageList,
  AccountsPageCreate,
  AccountsPageEdit,
} from "@/pages/item-master";
import {
  ClientsPageList,
  ClientsPageCreate,
  ClientsPageEdit,
} from "@/pages/orders";
import {
  InvoicePageList,
  InvoicesPageCreate,
  InvoicesPageShow,
} from "@/pages/invoices";
import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { ConfigProvider } from "@/providers/config-provider";
import "@refinedev/antd/dist/reset.css";
import "./styles/custom.css";
import { APPWRITE } from "./utils/constants";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            authProvider={authProvider}
            dataProvider={dataProvider}
            resources={[
              {
                name: APPWRITE.ITEM_COLLECTION,
                list: "/item-master",
                create: "/item-master/new",
                edit: "/item-master/:id/edit",
                meta: {
                  label: "Item Master",
                },
              },
              {
                name: APPWRITE.ORDER_COLLECTION,
                list: "/purchase-order",
                create: "/purchase-order/new",
                edit: "/purchase-order/:id/edit",
                meta: {
                  label: "Purchase Order",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              breadcrumb: false,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2 Header={() => <Header />} Sider={() => null}>
                    <div
                      style={{
                        maxWidth: "1280px",
                        padding: "24px",
                        margin: "0 auto",
                      }}
                    >
                      <Outlet />
                    </div>
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<NavigateToResource />} />
                <Route
                  path="/purchase-order"
                  element={
                    <ClientsPageList>
                      <Outlet />
                    </ClientsPageList>
                  }
                >
                  <Route index element={null} />
                  <Route path="new" element={<ClientsPageCreate />} />
                </Route>
                <Route
                  path="/purchase-order/:id/edit"
                  element={<ClientsPageEdit />}
                />
                <Route
                  path="/item-master"
                  element={
                    <AccountsPageList>
                      <Outlet />
                    </AccountsPageList>
                  }
                >
                  <Route index element={null} />
                  <Route path="new" element={<AccountsPageCreate />} />
                </Route>
                <Route
                  path="/item-master/:id/edit"
                  element={<AccountsPageEdit />}
                />

                <Route path="/invoices">
                  <Route index element={<InvoicePageList />} />
                  <Route path="new" element={<InvoicesPageCreate />} />
                  <Route path=":id" element={<InvoicesPageShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
