import { useRef, useState } from "react";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { QRCode } from "react-qrcode-logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SetState } from "@/types";
import { QRCodeProps } from "@/types/qr";
import { DownloadIcon } from "lucide-react";

const DownloadQRForm = ({
  imageFormat,
  setImageFormat,
  filename,
  setFilename,
  downloadQR,
}: {
  imageFormat: ImageFormat;
  setImageFormat: SetState<ImageFormat>;
  filename: string;
  setFilename: SetState<string>;
  downloadQR: () => void;
}) => {
  return (
    <div>
      <div>Download</div>
      <Separator className="mb-3 mt-1" />
      <div className="lg:flex gap-2">
        <div>
          <Label htmlFor="image-format">Image Format</Label>
          <Select
            value={imageFormat}
            onValueChange={(value) => {
              if (value !== "png" && value !== "jpeg" && value !== "pdf")
                return;
              setImageFormat(value);
            }}
          >
            <SelectTrigger id="image-format" className="w-full lg:w-[180px]">
              <SelectValue placeholder="Image Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Image Format</SelectLabel>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 lg:mt-0">
          <Label htmlFor="filename">Filename</Label>
          <Input
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full lg:w-auto"
            placeholder="Filename"
          />
        </div>
        <div className="mt-3 lg:mt-0">
          <Label className="hidden lg:inline opacity-0 select-none pointer-events-none">
            Download
          </Label>
          <Button
            className="flex w-full lg:w-auto"
            onClick={downloadQR}
            disabled={filename.length === 0}
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

type ShareFormProps = {
  url: string;
  qrProps: QRCodeProps;
};

type ImageFormat = "png" | "pdf" | "jpeg";

const ShareForm = ({ url, qrProps }: ShareFormProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageFormat, setImageFormat] = useState<ImageFormat>("png");
  const [filename, setFilename] = useState("");

  const downloadQR = () => {
    let exportFunc = exportComponentAsPNG;
    if (imageFormat === "jpeg") {
      exportFunc = exportComponentAsJPEG;
    } else if (imageFormat === "pdf") {
      exportFunc = exportComponentAsPDF;
    }
    exportFunc(ref, {
      fileName: filename.length > 0 ? filename : "my-qr",
    });
  };
  return (
    <div className="flex-1 mt-5">
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-blue-800 to-red-400 p-10 rounded-xl">
        <div className="border-2 aspect-square shadow-xl rounded overflow-hidden relative">
          <div ref={ref}>
            <QRCode
              style={{ width: "100%", height: "100%" }}
              value={url}
              {...qrProps}
            />
          </div>
        </div>
      </div>
      <div className="py-5 space-y-2">
        <DownloadQRForm
          filename={filename}
          setFilename={setFilename}
          imageFormat={imageFormat}
          setImageFormat={setImageFormat}
          downloadQR={downloadQR}
        />
      </div>
    </div>
  );
};

export default ShareForm;
