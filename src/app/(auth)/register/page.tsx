import FormRegister from "@/components/auth/FormRegister";

const Register = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Buat Akun</h1>
      <p className="font-normal text-gray-500">
        Dapatkan informasi produk terbaru, penawaran terbaik serta kemudahan
        bertransaksi.
      </p>
      <FormRegister />
    </div>
  );
};

export default Register;
