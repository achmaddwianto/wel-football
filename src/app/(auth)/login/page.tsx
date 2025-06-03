import FormLogin from "@/components/auth/FormLogin";
import { GoogleButton } from "@/components/auth/SocialButton/SocialButton";

const Login = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Masuk</h1>
      <p className="font-normal text-gray-500">
        Masukkan Email dan Password Anda.
      </p>
      <FormLogin />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-500 after:flex-1 after:border-t after:border-gray-500">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">
          atau
        </p>
      </div>
      <GoogleButton />
    </div>
  );
};

export default Login;
