import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  publicRoutes,
  adminRoutes,
  securityRoutes,
  tenantRoutes,
} from "./routes/routeConfig";

const App = () => {
  const [alarmActive, setAlarmActive] = useState(() => {
    return localStorage.getItem("emergencyActive") === "true";
  });
  const audioRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("wss://guestapi.zynamis.co.ke/ws/emergency/");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection opened");

      socket.send(
        JSON.stringify({
          type: "get_emergency_status",
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.event === "sos_alert") {
          const shouldPlay = message.actions?.play_sound === true;
          setAlarmActive(shouldPlay);

          localStorage.setItem("emergencyActive", shouldPlay.toString());
        }

        if (
          message.event === "stop_sos_alert" ||
          message.data?.emergency_status === "resolved"
        ) {
          setAlarmActive(false);

          localStorage.removeItem("emergencyActive");
        }

        if (message.event === "emergency_status_response") {
          const isActive = message.data?.is_active === true;
          setAlarmActive(isActive);

          if (isActive) {
            localStorage.setItem("emergencyActive", "true");
          } else {
            localStorage.removeItem("emergencyActive");
          }
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.warn("WebSocket closed");

      setTimeout(() => {
        console.log("Attempting to reconnect...");
      }, 3000);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (alarmActive) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Autoplay error:", err);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [alarmActive]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "emergencyActive") {
        const isActive = e.newValue === "true";
        setAlarmActive(isActive);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/sounds/fire_alarm.mp3" preload="auto" loop />
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Admin Protected Routes */}
          {adminRoutes.map((route, index) => (
            <Route
              key={`admin-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Security Protected Routes */}
          {securityRoutes.map((route, index) => (
            <Route
              key={`security-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={["security"]}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Tenant Protected Routes */}
          {tenantRoutes.map((route, index) => (
            <Route
              key={`tenant-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          <Route
            path="/userprofile"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "security", "tenant"]}
              ></ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#4caf50",
            },
          },
          error: {
            style: {
              background: "#f44336",
            },
          },
        }}
      />
    </>
  );
};

export default App;
