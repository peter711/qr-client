import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Spin } from "antd";

import QRReader from "components/QRReader";
import Layout from "components/Layout";

interface IHomepageProps {
  className?: string;
}

const Homepage = ({ className }: IHomepageProps) => {
  const history = useHistory();
  const [isProcessing, setIsProccesing] = useState<boolean>(false);

  const handleSuccessfullScan = useCallback(
    (text: string) => {
      setIsProccesing(true);

      setTimeout(() => {
        history.replace({
          pathname: "/success",
        });
      }, 3 * 1000);
    },
    [history]
  );

  return (
    <Layout className={className}>
      {isProcessing && <Spin className="activity-indicator" size="large" />}
      {!isProcessing && <QRReader onSuccessScan={handleSuccessfullScan} />}
    </Layout>
  );
};

const StyledHomepage = styled(Homepage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledHomepage;
