import { CustomizeForm } from "@/types/qr";
import { Circle, Square } from "lucide-react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const ConfigForm = ({
  form,
  setForm,
}: {
  form: CustomizeForm;
  setForm: React.Dispatch<React.SetStateAction<CustomizeForm>>;
}) => {
  const { size, quietZone, bgColor, fgColor, qrStyle, eyeRadius, eyeColor } =
    form;
  return (
    <div>
      <div className="font-bold">Customize</div>
      <Separator className="my-2" />
      <div className="space-y-4">
        {/* Size */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="size">Size</Label>
            <Input value={size + " px"} className="w-20 h-8" disabled={true} />
          </div>
          <Slider
            id="size"
            value={[size]}
            onValueChange={(nums) => {
              setForm({
                ...form,
                size: nums[0],
              });
            }}
            min={0}
            max={2000}
          />
        </div>

        {/* quietZone */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="quietzone">Padding</Label>
            <Input
              value={quietZone + " px"}
              className="w-20 h-8"
              disabled={true}
            />
          </div>
          <Slider
            id="quietzone"
            value={[quietZone]}
            onValueChange={(nums) => {
              setForm({
                ...form,
                quietZone: nums[0],
              });
            }}
            min={0}
            max={size / 2}
          />
        </div>

        {/* bgColor */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label className="whitespace-nowrap" htmlFor="bgcolor">
              Background Color
            </Label>
            <Input
              id="bgcolor"
              value={bgColor}
              onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
              placeholder="color"
              type="color"
            />
          </div>
        </div>

        {/* fgColor */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label className="whitespace-nowrap" htmlFor="fgcolor">
              Foreground Color
            </Label>
            <Input
              id="fgcolor"
              value={fgColor}
              onChange={(e) => setForm({ ...form, fgColor: e.target.value })}
              placeholder="color"
              type="color"
            />
          </div>
        </div>

        {/* QR Code Style */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between h-8">
            <Label htmlFor="logo-padding">QR Code Style</Label>
          </div>
          <Tabs
            value={qrStyle}
            onValueChange={(val) => {
              if (val !== "squares" && val !== "dots") return;
              setForm({ ...form, qrStyle: val });
            }}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="squares">
                <Square className="w-5 h-5 mr-2" />
                Squares
              </TabsTrigger>
              <TabsTrigger value="dots">
                <Circle className="w-5 h-5 mr-2" />
                Circles
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Eye Radius */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="eyeRadius">eyeRadius</Label>
            <Input
              value={eyeRadius + " px"}
              className="w-20 h-8"
              disabled={true}
            />
          </div>
          <Slider
            id="eyeRadius"
            value={[eyeRadius as number]}
            onValueChange={(nums) => {
              setForm({
                ...form,
                eyeRadius: nums[0],
              });
            }}
            min={0}
            max={size / 5}
          />
        </div>

        {/* Eye Color */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label className="whitespace-nowrap" htmlFor="eyeColor">
              Eye Color
            </Label>
            <Input
              id="eyeColor"
              value={eyeColor || fgColor}
              onChange={(e) => setForm({ ...form, eyeColor: e.target.value })}
              placeholder="color"
              type="color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigForm;
