import { PaintbrushIcon, QrCodeIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

import QREditor from "@/components/qr-editor/QREditor";
import Stepper from "@/components/ui/stepper";
import MainLayout from "@/layouts/MainLayout";
import { CustomizeForm, LogoConfigForm, QRCodeProps } from "@/types/qr";
import CreateForm from "./CreateForm";
import ShareForm from "./ShareForm";

export function getDomainFromUrl(url: string): string | undefined {
  const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/;

  try {
    const urlObj = new URL(url);
    const matches = urlObj.hostname.match(regex);

    if (matches && matches.length >= 2) {
      return matches[1];
    }
  } catch (error) {
    // Invalid URL, return the original string
    console.error(error);
  }

  return undefined;
}

export const formsToQRCodeProps = (
  customizeForm: CustomizeForm,
  logoForm?: LogoConfigForm
): QRCodeProps => {
  return {
    ...customizeForm,
    ...logoForm,
  };
};

const Home = () => {
  const [url, setUrl] = useState("https://www.apple.com");
  const [step, setStep] = useState(0);
  const [customizeForm, setCustomizeForm] = useState<CustomizeForm>({
    size: 150,
    quietZone: 10,
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    qrStyle: "squares",
    eyeRadius: undefined,
    eyeColor: undefined,
  });
  const [logoForm, setLogoForm] = useState<LogoConfigForm>();

  return (
    <MainLayout mainClassName="p-5 px-8 lg:container flex flex-col">
      <Stepper
        value={step}
        onChange={(newStep) => setStep(newStep)}
        steps={[
          {
            title: "Create",
            description: "URL, Name, Etc",
            icon: QrCodeIcon,
            component: (
              <CreateForm url={url} setUrl={setUrl} setStep={setStep} />
            ),
          },
          {
            title: "Customize",
            icon: PaintbrushIcon,
            component: (
              <QREditor
                url={url}
                form={customizeForm}
                setForm={setCustomizeForm}
                logoForm={logoForm}
                setLogoForm={setLogoForm}
              />
            ),
          },
          {
            title: "Share",
            icon: Share2Icon,
            component: (
              <ShareForm
                url={url}
                qrProps={formsToQRCodeProps(customizeForm, logoForm)}
              />
            ),
          },
        ]}
      />
    </MainLayout>
  );
};

export default Home;
