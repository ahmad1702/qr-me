import { cn } from "@/lib/utils";
import { CheckIcon, LucideIcon } from "lucide-react";
import { Fragment, ReactNode, useMemo } from "react";
import { Separator } from "./separator";

export type Step = {
  title: string;
  description?: string;
  icon: LucideIcon;
  component: ReactNode;
};
type Props = {
  value: number;
  onChange: (newStep: number) => void;
  steps: Step[];
  className?: string;
};

const Stepper = ({ value, onChange, steps, className }: Props) => {
  const componentToShow = useMemo(
    () => steps.at(value)?.component,
    [steps, value]
  );
  return (
    <>
      <ol className={cn("flex items-center w-full", className)}>
        {steps.map((step, i) => {
          const { title, description, icon: Icon } = step;
          const isLast = i === steps.length - 1;
          return (
            <Fragment key={title}>
              <li
                onClick={() => onChange(i)}
                className={cn(
                  "flex items-start lg:items-center justify-center hover:bg-accent p-2 pt-5 lg:pt-4 lg:p-4 rounded-xl cursor-pointer active:scale-95 duration-300 select-none w-32 lg:w-auto h-32 lg:h-auto border",
                  i !== 0 && "ml-2",
                  !isLast && "mr-2",
                  value < i && "opacity-50"
                )}
              >
                <span
                  className={cn("flex items-center flex-col lg:flex-row gap-2")}
                >
                  <div className="rounded-full p-2 bg-foreground text-background">
                    {i < value ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center flex flex-col items-center lg:text-left lg:block">
                    <div className="font-bold lg:text-lg">{title}</div>
                    <div className="text-xs">{description}</div>
                  </div>
                </span>
              </li>
              {!isLast && <Separator className="flex-1 h-[3px] rounded" />}
            </Fragment>
          );
        })}
      </ol>
      {componentToShow}
    </>
  );
};
export default Stepper;
