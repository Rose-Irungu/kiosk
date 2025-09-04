import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function GlobalModal({ children }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    let root = document.getElementById("modal-root");

    // Create dynamically if not found
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }

    setModalRoot(root);

    // Cleanup when unmounting
    return () => {
      if (root && root.childElementCount === 0) {
        root.remove();
      }
    };
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-light bg-opacity-50 backdrop-blur-sm z-[1050]">
      <div className="relative p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-lg">
        {children}
      </div>
    </div>,
    modalRoot
  );
}
