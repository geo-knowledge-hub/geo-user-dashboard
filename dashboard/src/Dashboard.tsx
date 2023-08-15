/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  notificationProvider,
} from "@refinedev/chakra-ui";

import { QueryClientProvider } from "react-query";
import { DataProvider } from "@refinedev/strapi-v4";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";

import { DashboardTheme } from "./theme";

import { queryClient } from "./query";
import { axiosInstance } from "./network";
import { ProviderRestAPI } from "./config";
import { AuthProvider, AuthProviders, AuthLoginRedirect } from "./auth";

import { Hero } from "./components/hero";
import { Header } from "./components/header";
import { Title } from "./components/title";

import { RolePermissionGenerator } from "./security";

import { UserRouteConfig, UserRouteResource } from "./pages/users";
import { ProviderRouterConfig, ProviderRouteResource } from "./pages/providers";
import { StoryRouterConfig, StoryRouteResource } from "./pages/stories";
import { ActionRouterConfig, ActionRouteResource } from "./pages/actions";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={DashboardTheme}>{children}</ChakraProvider>
        </QueryClientProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
};

/**
 * Dashboard Application component.
 */
export const Dashboard = () => {
  return (
    <Wrapper>
      <Refine
        authProvider={AuthProvider}
        dataProvider={DataProvider(ProviderRestAPI, axiosInstance)}
        notificationProvider={notificationProvider}
        routerProvider={routerBindings}
        accessControlProvider={RolePermissionGenerator.generate()}
        resources={[
          ProviderRouteResource,
          UserRouteResource,
          StoryRouteResource,
          ActionRouteResource,
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
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

            <Route path={StoryRouterConfig.base.path}>
              <Route index element={StoryRouterConfig.base.component} />
              <Route
                path={StoryRouterConfig.create.path}
                element={StoryRouterConfig.create.component}
              />
              <Route
                path={StoryRouterConfig.edit.path}
                element={StoryRouterConfig.edit.component}
              />
              <Route
                path={StoryRouterConfig.show.path}
                element={StoryRouterConfig.show.component}
              />
            </Route>
            <Route path={ActionRouterConfig.base.path}>
              <Route index element={ActionRouterConfig.base.component} />
              <Route
                path={ActionRouterConfig.create.path}
                element={ActionRouterConfig.create.component}
              />
              <Route
                path={ActionRouterConfig.edit.path}
                element={ActionRouterConfig.edit.component}
              />
              <Route
                path={ActionRouterConfig.show.path}
                element={ActionRouterConfig.show.component}
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
    </Wrapper>
  );
};
