import FormKYC from "@/components/dashboard/FormKYC";
import AppConnectButton from "@/components/shared/AppConnectButton";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <AppConnectButton />
      <FormKYC />
    </main>
  );
}
