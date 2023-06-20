import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomizeForm, LogoConfigForm } from "@/types/qr";
import { Circle, Square } from "lucide-react";
import { Switch } from "../ui/switch";

const LogoForm = ({
  form,
  logoForm,
  setLogoForm,
}: {
  form: CustomizeForm;
  logoForm: LogoConfigForm | undefined;
  setLogoForm: React.Dispatch<React.SetStateAction<LogoConfigForm | undefined>>;
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const file = files[0];
      const logoImage = URL.createObjectURL(file);
      if (logoForm === undefined) {
        setLogoForm({
          logoImage,
          logoWidth: form.size * 0.2,
          logoHeight: form.size * 0.2,
          logoOpacity: 1,
          logoPadding: 0,
          logoPaddingStyle: "square",
          removeQrCodeBehindLogo: false,
        });
      } else {
        setLogoForm({
          ...logoForm,
          logoImage,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="font-bold">Logo</div>
      <Separator />
      <div className="space-y-4">
        <div className="w-full">
          <Label htmlFor="picture">Picture</Label>
          <Input onChange={handleFileUpload} id="picture" type="file" />
        </div>
        {logoForm !== undefined && (
          <>
            {/* Width */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="logo-width">Width</Label>
                <Input
                  value={logoForm.logoWidth + " px"}
                  className="w-16 h-8"
                  disabled={true}
                />
              </div>
              <Slider
                id="logo-width"
                value={[logoForm.logoWidth]}
                onValueChange={(nums) => {
                  setLogoForm({
                    ...logoForm,
                    logoWidth: nums[0],
                  });
                }}
                min={0}
                max={form.size / 2}
              />
            </div>

            {/* Height */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="logo-height">Height</Label>
                <Input
                  value={logoForm.logoHeight + " px"}
                  className="w-16 h-8"
                  disabled={true}
                />
              </div>
              <Slider
                id="logo-height"
                value={[logoForm.logoHeight]}
                onValueChange={(nums) => {
                  setLogoForm({
                    ...logoForm,
                    logoHeight: nums[0],
                  });
                }}
                min={0}
                max={form.size / 2}
              />
            </div>

            {/* Opacity */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="logo-opacity">Opacity</Label>
                <Input
                  value={logoForm.logoOpacity * 100 + "%"}
                  className="w-16 h-8"
                  disabled={true}
                />
              </div>
              <Slider
                id="logo-opacity"
                value={[logoForm.logoOpacity]}
                onValueChange={(nums) => {
                  setLogoForm({
                    ...logoForm,
                    logoOpacity: nums[0],
                  });
                }}
                min={0}
                max={1}
                step={0.01}
              />
            </div>

            {/* Padding */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="logo-padding">Padding</Label>
                <Input
                  value={logoForm.logoPadding + " px"}
                  className="w-16 h-8"
                  disabled={true}
                />
              </div>
              <Slider
                id="logo-padding"
                value={[logoForm.logoPadding]}
                onValueChange={(nums) => {
                  setLogoForm({
                    ...logoForm,
                    logoPadding: nums[0],
                  });
                }}
                min={0}
                max={form.size / 6}
              />
            </div>

            {/* Padding Style */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between h-8">
                <Label htmlFor="logo-padding">Padding Style</Label>
              </div>
              <Tabs
                value={logoForm.logoPaddingStyle}
                onValueChange={(val) => {
                  if (val !== "square" && val !== "circle") return;
                  setLogoForm({ ...logoForm, logoPaddingStyle: val });
                }}
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="square">
                    <Square className="w-5 h-5 mr-2" />
                    Square
                  </TabsTrigger>
                  <TabsTrigger value="circle">
                    <Circle className="w-5 h-5 mr-2" />
                    Circle
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* removeQrCodeBehindLogo */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label
                  className="whitespace-nowrap"
                  htmlFor="removeQrCodeBehindLogo"
                >
                  Remove QRCode Behind Logo
                </Label>
                <Switch
                  id="removeQrCodeBehindLogo"
                  checked={logoForm.removeQrCodeBehindLogo}
                  onCheckedChange={(checked) =>
                    setLogoForm({
                      ...logoForm,
                      removeQrCodeBehindLogo: checked,
                    })
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoForm;
