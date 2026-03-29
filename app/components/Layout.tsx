import { Outlet, Link } from "react-router";
import { useCurrentAddress } from "~/hooks/useCurrentAddress";
/**
 * ヘッダーとフッターを記述する
 * 今回はヘッダのみ、必要に応じてフッターを記述する
 */
export default function Layout() {
  const menuItems = [
    {
      name: "お気に入り",
      path: "/favorites",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-amber-200">
        <span className="text-3xl md:ml-5">
          <Link to="/">
            <img
              src="./Logo.svg"
              alt="ぐるっとのロゴ"
              className="h-6 md:h-12 w-auto"
            />
          </Link>
        </span>
        <nav className="flex gap-4 md:gap-10 md:mr-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block font-medium  hover:text-orange-500 hover:opacity-100 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="grow flex justify-center">
        <Outlet />
      </main>
    </div>
  );
}
