import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

type CopyButtonProps = React.ComponentProps<"button"> & {
  value?: string;
  className?: string;
};

const CopyButton = ({ value, className, ...props }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <button
      onClick={(e) => {
        if (value !== undefined) {
          navigator.clipboard.writeText(value);
        }
        setHasCopied(true);
      }}
      {...props}
      className={cn(
        "relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none",
        className
      )}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="h-3 w-3" />
      ) : (
        <CopyIcon className="h-3 w-3" />
      )}
    </button>
  );
};

export default CopyButton;
