import React, { useCallback } from "react";
import { CheckCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Typography, Button } from "antd";
import { useHistory } from "react-router-dom";

import Layout from "components/Layout";

const { Paragraph } = Typography;

interface ISuccessProps {
  className?: string;
}

const Success = ({ className }: ISuccessProps) => {
  const history = useHistory();
  const handleScanNextClick = useCallback(() => {
    history.replace({
      pathname: "/",
    });
  }, [history]);

  return (
    <Layout className={className}>
      <div>
        <CheckCircleTwoTone className="success-icon" />
        <Paragraph type="success" className="success-message" strong={true}>
          Congratulations!
        </Paragraph>
        <Paragraph type="secondary" className="success-message">
          Your product is verified and original. Thanks for your trust!
        </Paragraph>
      </div>
      <div>
        <Button
          onClick={handleScanNextClick}
          icon={<SearchOutlined />}
          type="link"
        >
          Scan next
        </Button>
      </div>
    </Layout>
  );
};

const StyledSuccess = styled(Success)`
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: 90% auto;
  justify-content: center;
  align-items: center;
  text-align: center;

  .success-icon {
    font-size: 108px;
  }

  .success-message {
    margin-top: 1em;
    max-width: 100vw;
  }
`;

export default StyledSuccess;
