import React from "react";
import { render, screen } from "@testing-library/react";
import { UserContext } from "context/user";
import AuthorizedRoutes from "../Componentes/AuthorizedRoutes";

it("renders not authorized if the state dont match", () => {
  render(
    <UserContext.Provider value={{ userData: { estado: "PENDIENTE" } }}>
      <AuthorizedRoutes stateList={["AUTORIZADO"]}>
        <div>Este es el children</div>
      </AuthorizedRoutes>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("authRoutes")).toHaveTextContent(
    "No estas autorizad@ para acceder a esta página."
  );
});

it("renders the children if the user state is in the stateList", () => {
  render(
    <UserContext.Provider value={{ userData: { estado: "AUTORIZADO" } }}>
      <AuthorizedRoutes stateList={["AUTORIZADO"]}>
        <div data-testid="children2">Este es el children</div>
      </AuthorizedRoutes>
    </UserContext.Provider>
  );
  expect(screen.getByTestId("children2")).toBeInTheDocument();
});
