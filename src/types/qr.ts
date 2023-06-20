import { QRCode } from "react-qrcode-logo";

export type InnerOuterEyeColor = {
  inner: string;
  outer: string;
};
export type EyeColor = string | InnerOuterEyeColor;
export type CornerRadii =
  | number
  | [number, number, number, number]
  | InnerOuterRadii;
export type InnerOuterRadii = {
  inner: number | [number, number, number, number];
  outer: number | [number, number, number, number];
};

export type LogoConfigForm = {
  logoImage: string;
  logoWidth: number;
  logoHeight: number;
  logoOpacity: number;
  logoPadding: number;
  logoPaddingStyle: "square" | "circle";
  removeQrCodeBehindLogo: boolean;
};

export type CustomizeForm = {
  size: number;
  quietZone: number;
  bgColor: string;
  fgColor: string;
  qrStyle: "squares" | "dots";

  eyeRadius?: CornerRadii | [CornerRadii, CornerRadii, CornerRadii];
  eyeColor?: EyeColor | [EyeColor, EyeColor, EyeColor];
};

export type QRCodeProps = React.ComponentPropsWithoutRef<typeof QRCode>;
