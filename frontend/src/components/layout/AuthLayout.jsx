function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Tasky
        </h1>

        <p className="text-center text-slate-500 mb-8">{title}</p>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
