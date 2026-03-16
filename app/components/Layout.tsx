import { Outlet, Link } from "react-router";

export default function Layout() {
  //TODO: pathを変更する
  const menuItems = [
    { name: "さがす", path: "/research" },
    { name: "お気に入り", path: "/" },
    { name: "設定", path: "/settings" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-amber-200">
        <span className="text-3xl ml-5">
          <Link to="/">Gurutto</Link>
        </span>
        <nav className="flex gap-10 mr-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="grow flex justify-center">
        <Outlet />
      </main>
      <footer className="flex justify-center p-2 text-gray-500 dark:text-gray-400">
        <p className="text-sm">© 2025-2026 Suzune</p>
      </footer>
    </div>
  );
}
