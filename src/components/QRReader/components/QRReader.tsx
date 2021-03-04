import { Exception, NotFoundException } from "@zxing/library";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BarcodeOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Typography } from "antd";

import QRReaderService from "../services/QRReaderService";
import DevicesList from "./DevicesList";

const { Paragraph } = Typography;

interface QRReaderProps {
  className?: string;
  onSuccessScan?: (text: string) => void;
  onErrorScan?: (err: Exception) => void;
}

const QRReader = ({ className, onSuccessScan, onErrorScan }: QRReaderProps) => {
  const qrService = useMemo(() => new QRReaderService(), []);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [isScaning, setIsScaning] = useState<boolean>(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const handleOnScanClick = useCallback(() => {
    if (selectedDeviceId) {
      setIsScaning(true);
      qrService.decode(selectedDeviceId, (result, err) => {
        if (result) {
          const text = result.getText();
          if (onSuccessScan) onSuccessScan(text);
        }
        if (err && !(err instanceof NotFoundException)) {
          if (onErrorScan) onErrorScan(err);
        }
      });
    }
  }, [onErrorScan, onSuccessScan, qrService, selectedDeviceId]);

  useEffect(() => {
    qrService.getDevicesList().then((devices) => {
      setDevices(devices);
      setSelectedDeviceId(devices[0].deviceId);
    });

    return () => {
      qrService.stopDecoding();
    };
  }, [qrService]);

  return (
    <div className={className}>
      {devices && selectedDeviceId !== null && (
        <div>
          <DevicesList
            mediaDeviceInfo={devices}
            defaultValue={selectedDeviceId}
            onDeviceChange={setSelectedDeviceId}
          />
        </div>
      )}
      {isScaning && (
        <div className="video-area">
          <video id="video" width="300" height="200" />
          <div className="video-hint">
            <InfoCircleTwoTone className="info-icon" />
            <Paragraph type="secondary" className="hint">
              Use your camera to scan QR code
            </Paragraph>
          </div>
        </div>
      )}
      {!isScaning && (
        <div className="barcode" onClick={handleOnScanClick}>
          <BarcodeOutlined className="barcode-icon" />
          <Paragraph type="secondary">Tap to scan QR code</Paragraph>
        </div>
      )}
    </div>
  );
};

const StyledQRReader = styled(QRReader)`
  height: 100%;
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: 10% auto;
  justify-content: center;
  text-align: center;

  .video-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    .info-icon {
      margin-right: 10px;
      font-size: 18px;
    }

    .hint {
      margin: 0;
    }

    margin-bottom: 1em;
  }

  .barcode-icon {
    font-size: 200px;
  }
`;

export default StyledQRReader;
