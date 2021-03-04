import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  height: 100vh;
  padding: 1em 0.5em 1em 0.5em;
  position: relative;
`;

interface ILayoutProps extends React.Props<{}> {
  className?: string;
}

const Layout = ({ children, className }: ILayoutProps) => {
  return <LayoutWrapper className={className}>{children}</LayoutWrapper>;
};

export default Layout;
