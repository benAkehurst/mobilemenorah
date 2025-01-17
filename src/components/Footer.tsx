import Link from "next/link";
// import EmailSubscribe from "../Forms/NewsletterSubscribe";
import { appConfig } from "../../app.config";

const Footer = () => {
  return (
    <footer
      className="footer footer-center p-10 bg-base-100 shadow text-base-content rounded"
      id="footer"
    >
      <nav className="flex flex-row items-center justify-center mb-6">
        <Link
          href={"/about"}
          className="link link-hover block mb-4 md:inline-block mr-4"
          aria-label="link to about us page"
        >
          About us
        </Link>
        <Link
          href={"/privacy-policy"}
          className="link link-hover block mb-4 md:inline-block mr-4"
          aria-label="link to privacy policy page"
        >
          Privacy Policy
        </Link>
        <Link
          href={"/terms-and-conditions"}
          className="link link-hover block mb-4 md:inline-block mr-4"
          aria-label="link to terms and conditions page"
        >
          Terms
        </Link>
      </nav>
      <div className="text-center flex flex-row items-center justify-center mb-4">
        <p>
          All rights reserved {appConfig.companyName} ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
      <div className="text-center">
        <p>
          Created by{" "}
          <a
            href="https://www.benakehurst.com?utm_source=mobile-menorah"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ben Akehurst
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
