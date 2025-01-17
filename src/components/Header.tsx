import Link from "next/link";
import Image from "next/image";
import { appConfig } from "../../app.config";

const Header = () => {
  return (
    <header className="bg-base-100 shadow" id="header">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="logo"
            width={40}
            height={40}
            className="w-8 h-8"
          />
          <h1 className="text-md font-semibold ml-2">{appConfig.appName}</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
