import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  containerClassName?: string;
  mainClassName?: string;
}

export default function MainLayout({
  children,
  containerClassName,
  mainClassName,
}: LayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", containerClassName)}>
      <SiteHeader />
      <main className={cn("flex-1", mainClassName)}>{children}</main>
    </div>
  );
}
