import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold sm:text-4xl">👋 Welcome Back</h1>

            <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
              Organize your work, manage your daily tasks, and stay productive.
              Everything you need is right here.
            </p>
          </div>
        </section>

        {/* Page Content */}
        <section className="rounded-3xl bg-white p-4 shadow-lg sm:p-6 lg:p-8">
          {children}
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
