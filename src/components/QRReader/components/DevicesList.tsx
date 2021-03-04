import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

interface IDevicesListProps {
  className?: string;
  mediaDeviceInfo: MediaDeviceInfo[];
  defaultValue?: string;
  onDeviceChange?: (id: string) => void;
}

const DevicesList = ({
  className,
  mediaDeviceInfo,
  defaultValue,
  onDeviceChange,
}: IDevicesListProps) => {
  return (
    <Select
      bordered={false}
      onChange={onDeviceChange}
      defaultValue={defaultValue}
      className={`${className}`}
    >
      {mediaDeviceInfo?.map(({ deviceId, label }, index) => (
        <Option key={`${deviceId}__${index}`} value={deviceId}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

const StyledDevicesList = styled(DevicesList)`
  width: 100%;
`;

export default StyledDevicesList;
