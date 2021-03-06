import { useEffect, useState } from "react";
import { PortalWithState } from "react-portal";
import Router from "next/router";
import Link from "next/link";
import SearchIcon from "../Icons/Search";
import CrossIcon from "../Icons/Cross";
import Products from "../Product/Products";
import $ from "./_Search";
import { useStore } from "../../utils/contextStore";
import { useCloseModals } from "../../utils/useCloseModals";

const Modal = ({ closePortal }) => {
  const [input, setInput] = useState("");
  const [store, dispatch] = useStore();
  const [debouncedInput, setDebouncedInput] = useState(input);
  useCloseModals(closePortal);
  useEffect(() => {
    Router.events.on("routeChangeComplete", closePortal);
    return () => Router.events.off("routeChangeComplete", closePortal);
  }, []);

  useEffect(() => {
    if (store.menuOpen || store.cartOpen) {
      dispatch({ type: "CLOSE_SIDEBAR" });
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);
    return () => clearTimeout(handler);
  }, [input]);

  const handleSearch = (e) => setInput(e.target.value);
  const clearInput = () => setInput("");
  return (
    <$.Wrapper id="portal">
      <$.Nav>
        <$.IconButton size={"19"} onClick={closePortal}>
          <CrossIcon />
        </$.IconButton>
      </$.Nav>
      <div
        css={`
          flex-grow: ${input.length > 1 ? 0.1 : 0.6};
          transition: all 0.3s;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        `}
      >
        <$.InputWrapper>
          <$.SearchInput
            autoFocus
            type="text"
            onChange={handleSearch}
            value={input}
            placeholder="Search our store"
          />
          {input.length > 1 ? (
            <$.IconButton size={"19"} onClick={clearInput}>
              <CrossIcon />
            </$.IconButton>
          ) : (
            <$.IconButton size={"25"}>
              <SearchIcon lightTheme={false} />
            </$.IconButton>
          )}
        </$.InputWrapper>
        <p>Browse categories</p>
        <$.Links>
          <Link href="/collections/mens-collection">
            <a>Men's Collection</a>
          </Link>

          <span>/</span>

          <Link href="/collections/womens-collection">
            <a>Women's Collection</a>
          </Link>
        </$.Links>

        <div
          css={`
            height: 0;
          `}
        >
          {debouncedInput.length > 1 && (
            <Products
              inputDependency={[debouncedInput]}
              padding="0 0 100px 0"
            />
          )}
        </div>
      </div>
    </$.Wrapper>
  );
};
const Search = ({ isLightTheme }) => (
  <PortalWithState closeOnEsc>
    {({ openPortal, closePortal, isOpen, portal }) => {
      return (
        <React.Fragment>
          <$.IconButton id="search" onClick={openPortal}>
            <SearchIcon lightTheme={isLightTheme} />
          </$.IconButton>
          {portal(<Modal closePortal={closePortal} />)}
        </React.Fragment>
      );
    }}
  </PortalWithState>
);

export default Search;
