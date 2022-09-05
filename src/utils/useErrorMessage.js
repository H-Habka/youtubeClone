import React from "react";
import { toast } from "react-hot-toast";
import { VscError } from "react-icons/vsc";

const useErrorMessage = () => {
  return () =>
    toast(
      (t) => (
        <div className="flex flex-col gap-4 bg-[#161616] text-white text-sm py-2 items-center">
          <div className="flex items-center gap-2">
            <VscError size={40} color="#fc1503" />
            <span>Network Error You May Have To Open VPN</span>
          </div>
          <button
            className="px-4 py-2 text-lg rounded-lg bg-gray-800 text-gray-100 w-fit"
            onClick={() => toast.dismiss(t.id)}
          >
            Ok
          </button>
        </div>
      ),
      { style: { background: "#161616", color: "#fff" } }
    );
};

export default useErrorMessage;
