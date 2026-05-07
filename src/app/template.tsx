import { Preloader } from "@/components/layout/preloader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
