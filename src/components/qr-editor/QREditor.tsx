import { formsToQRCodeProps } from "@/pages/home/Home";
import { CustomizeForm, LogoConfigForm } from "@/types/qr";
import { QRCode } from "react-qrcode-logo";

import { SetState } from "@/types";
import ConfigForm from "./ConfigForm";
import LogoForm from "./LogoForm";

const QREditor = ({
  url,
  form,
  setForm,
  logoForm,
  setLogoForm,
}: {
  url: string;
  form: CustomizeForm;
  setForm: SetState<CustomizeForm>;
  logoForm: LogoConfigForm | undefined;
  setLogoForm: SetState<LogoConfigForm | undefined>;
}) => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row flex-1 mt-5">
        <aside className="lg:border-r-2 py-5 lg:p-5">
          <div className="space-y-4">
            <ConfigForm form={form} setForm={setForm} />
            <LogoForm
              form={form}
              logoForm={logoForm}
              setLogoForm={setLogoForm}
            />
          </div>
        </aside>
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-blue-800 to-red-400 p-10 rounded-xl lg:ml-4">
          <div className="border-2 aspect-square shadow-xl rounded overflow-hidden">
            <QRCode
              style={{ width: "100%", height: "100%" }}
              value={url}
              {...formsToQRCodeProps(form, logoForm)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QREditor;
