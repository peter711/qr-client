import {
  BrowserMultiFormatReader,
  DecodeContinuouslyCallback,
} from "@zxing/library";

export default class QRReaderService {
  private reader: BrowserMultiFormatReader;

  constructor() {
    this.reader = new BrowserMultiFormatReader();
  }

  getDevicesList() {
    return this.reader.listVideoInputDevices();
  }

  decode(deviceId: string, callback: DecodeContinuouslyCallback) {
    this.reader.decodeFromVideoDevice(deviceId, "video", callback);
  }

  stopDecoding() {
    this.reader.stopAsyncDecode();
  }
}
