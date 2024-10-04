import FormKYC from "@/components/dashboard/FormKYC";

export default function Home() {
  return (
    <main className="w-screen min-h-screen pt-28 flex flex-col items-center justify-center bg-gray-800 gap-10">
      <FormKYC />
    </main>
  );
}
