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

  // state
  const [visitorName, setVisitorName] = useState("Guest");
  const [visitorRef, setVisitorRef] = useState("");

  // fetch visitor info on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/visitor/welcome"); // { visitorName, visitorRef }
        setVisitorName(data.visitorName ?? "Visitor");
        setVisitorRef(data.visitorRef ?? "Unknown");
      } catch (err) {
        console.error("Error fetching visitor data:", err);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden relative">
      {/* ─── Header ─── */}
      <Header />

      {/* ─── Two‑pane layout ─── */}
      <div className="flex flex-row w-full min-w-[768px] flex-1 overflow-hidden">
        {/* Left: image pane */}
        <div
          className="w-1/2 h-[200px] lg:h-auto bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${rectangle})` }}
        >
          <img
            src={logo}
            alt="West Brook Logo"
            className="max-w-[200px] max-h-[500px] w-full h-auto overflow-hidden"
          />
        </div>

        {/* Right: navbar + centered welcome card */}
        <div className="w-1/2 bg-[#E6FBE9] relative flex flex-col px-6 pt-0 pb-10">
          {/* Navbar */}
          <div className="w-full flex justify-between items-center mt-0 mb-10">
            <Navbar />
          </div>

          {/* Welcome card centered */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <div className="flex flex-col gap-1 rounded-xl border border-blue-500 bg-blue-100 p-4 text-center w-full">
                <h2 className="text-2xl font-normal text-green-700">
                  {t("hi")}
                  {visitorName}
                </h2>
                <p className="mx-2 mb-3">{t("enjoyStay")}</p>
                <p className="mx-2 mb-3">
                  {t("visitorRefNo")}:&nbsp;
                  <span className="font-semibold text-blue-800">
                    {visitorRef}
                  </span>
                </p>
                <p className="mx-2 mb-3">{t("codeSend")}</p>
              </div>

              {/* CTA button */}
              <button
                type="button"
                className="self-center rounded-2xl bg-green-600 px-4 py-2 font-normal text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <HomeIcon className="mr-2 h-5 w-5 inline-flex" />
                <Link to="/" className="text-white">
                  {t("returnToHome")}
                </Link>
              </button>
            </div>
          </div>

          {/* Decorative sphere */}
          <img
            src={sphere}
            alt="Decorative sphere"
            className="hidden lg:block w-[150px] absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorWelcome;
