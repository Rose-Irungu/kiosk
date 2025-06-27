import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";
import rectangle from "../assets/rectangle-780.png";
import sphere from "../assets/sphere-green-glossy0.png";
import { useTranslation } from "react-i18next";

const VisitorWelcome = () => {
  const { t } = useTranslation();
  const [visitorName, setVisitorName] = useState("Guest");
  const [visitorRef, setVisitorRef] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/visitor/welcome");
        setVisitorName(data?.visitorName ?? "Visitor");
        setVisitorRef(data?.visitorRef ?? "––");
      } catch (err) {
        console.error("Error fetching visitor data:", err);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex flex-1 flex-col lg:flex-row">
        <section
          className="relative flex h-48 w-full flex-shrink-0 items-center justify-center bg-cover bg-center lg:h-auto lg:w-1/2"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="w-32 md:w-44 lg:w-60 xl:w-72"
          />
        </section>
        <section className="relative flex w-full flex-col items-center bg-[#E6FBE9] px-4 pb-12 pt-4 lg:w-1/2 lg:px-10">
          <div className="mb-8 w-full max-w-6xl">
            <Navbar />
          </div>
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="flex w-full max-w-md flex-col items-center gap-6">
              <div className="w-full rounded-xl border border-blue-500 bg-blue-100 p-5 text-center">
                <h2 className="text-2xl font-semibold text-green-700 md:text-3xl">
                  {t("hi")} {visitorName}
                </h2>
                <p className="mb-3 mt-1">{t("enjoyStay")}</p>
                <p className="mb-3">
                  {t("visitorRefNo")}:{" "}
                  <span className="font-bold text-blue-800">{visitorRef}</span>
                </p>
                <p>{t("codeSend")}</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <HomeIcon className="h-5 w-5" />
                {t("returnToHome")}
              </Link>
            </div>
          </div>
          <img
            src={sphere}
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 hidden w-36 translate-x-1/3 translate-y-1/3 lg:block xl:w-44"
          />
        </section>
      </main>
    </div>
  );
};

export default VisitorWelcome;
