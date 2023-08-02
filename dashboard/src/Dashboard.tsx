/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/chakra-ui";

import { DataProvider } from "@refinedev/strapi-v4";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";

import { UserRouteConfig, UserRouteResource } from "./pages/users";
import { ProviderRouterConfig, ProviderRouteResource } from "./pages/providers";

import { Header } from "./components/header";

import { AuthProvider, AuthProviders, AuthLoginRedirect } from "./auth";

import { axiosInstance } from "./network";
import { ProviderRestAPI } from "./config";

import { PROJECT_ID } from "./constants";
import { Hero } from "./components";
import { Title } from "./components/title";

export const Dashboard = () => {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            authProvider={AuthProvider}
            dataProvider={DataProvider(ProviderRestAPI, axiosInstance)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            resources={[UserRouteResource, ProviderRouteResource]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: PROJECT_ID,
            }}
          >
            <Routes>
              <Route
                path="/connect/:providerName/redirect"
                element={<AuthLoginRedirect />}
              />
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Title={({ collapsed }) => <Title collapsed={collapsed} />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<Hero />} />
                <Route
                  index
                  element={
                    <NavigateToResource resource={UserRouteConfig.base.path} />
                  }
                />
                <Route path={UserRouteConfig.base.path}>
                  <Route index element={UserRouteConfig.base.component} />
                  <Route
                    path={UserRouteConfig.create.path}
                    element={UserRouteConfig.create.component}
                  />
                  <Route
                    path={UserRouteConfig.edit.path}
                    element={UserRouteConfig.edit.component}
                  />
                  <Route
                    path={UserRouteConfig.show.path}
                    element={UserRouteConfig.show.component}
                  />
                </Route>

                <Route path={ProviderRouterConfig.base.path}>
                  <Route index element={ProviderRouterConfig.base.component} />
                  <Route
                    path={ProviderRouterConfig.create.path}
                    element={ProviderRouterConfig.create.component}
                  />
                  <Route
                    path={ProviderRouterConfig.edit.path}
                    element={ProviderRouterConfig.edit.component}
                  />
                  <Route
                    path={ProviderRouterConfig.show.path}
                    element={ProviderRouterConfig.show.component}
                  />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      providers={AuthProviders}
                      registerLink={false}
                      forgotPasswordLink={false}
                      title={
                        <Heading fontWeight={"bold"} fontSize={"2xl"}>
                          GEO Knowledge Hub Dashboard
                        </Heading>
                      }
                    />
                  }
                />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
};
