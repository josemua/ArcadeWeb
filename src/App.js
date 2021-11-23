import Routes from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserContext } from "./context/user";
import { useState } from "react";

// const httpLink = createHttpLink({
//   uri: "https://arcadeweb-backend.herokuapp.com/graphql",
// });

const client = new ApolloClient({
  uri: "https://arcadeweb-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({ name: "No_Name" });

  return (
      <ApolloProvider client={client}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes />
        </UserContext.Provider>
      </ApolloProvider>
  );
}

export default App;
