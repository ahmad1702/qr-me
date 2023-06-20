import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SetState } from "@/types";
import { ArrowRight, LinkIcon, Paintbrush, QrCodeIcon } from "lucide-react";
import { QRCode } from "react-qrcode-logo";
import { getDomainFromUrl } from "./Home";

const CreateForm = ({
  url,
  setUrl,
  setStep,
}: {
  url: string;
  setUrl: SetState<string>;
  setStep: SetState<number>;
}) => {
  return (
    <div className="flex-1 py-5 flex flex-col justify-between lg:justify-start lg:flex-row-reverse lg:gap-4 lg:items-center">
      <div className="border rounded w-full flex flex-col items-center lg:w-auto p-2">
        {url.length > 0 ? (
          <>
            <div className="dark:hidden">
              <QRCode value={url} bgColor="rgb(0, 0, 0, 0)" />
            </div>
            <div className="hidden dark:block">
              <QRCode value={url} bgColor="rgb(0, 0, 0, 0)" fgColor="white" />
            </div>
            {getDomainFromUrl(url) !== undefined ? (
              <a href={url} target="_blank">
                <Badge>
                  <LinkIcon className="w-4 h-4 mr-1 my-1 " />
                  {getDomainFromUrl(url)}
                </Badge>
              </a>
            ) : (
              <Badge>{url.length > 12 ? url.slice(0, 12) + "..." : url}</Badge>
            )}
          </>
        ) : (
          <div className="w-[170px] aspect-square flex flex-col items-center justify-center text-center bg-muted text-muted-foreground p-3">
            <QrCodeIcon className="w-14 h-14" />
            <div className="font-bold">Empty</div>
            <div className="text-xs">
              A QR Code will show up here once there is some text to represent
            </div>
          </div>
        )}
      </div>
      <div className="flex lg:flex-1">
        <div className="flex-1 space-y-2">
          <div>
            <div className="font-bold text-2xl">
              Enter The Contents of the QR:
            </div>
            <div className="text-lg">
              This could be a URL, your email address, phone number, etc
            </div>
          </div>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL Here"
            className="text-lg lg:text-xl"
          />
          <Button onClick={() => setStep(1)} className="w-full justify-between">
            <span></span>
            <span>
              <Paintbrush className="inline-block mr-2" />
              Customize
            </span>
            <ArrowRight />
          </Button>
        </div>
        <Separator
          orientation="vertical"
          className="h-32 ml-4 hidden lg:block"
        />
      </div>
    </div>
  );
};

export default CreateForm;
