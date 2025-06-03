const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mt-5 mx-auto h-screen">
        <div className="w-full bg-white rounded shadow mt-0 max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
