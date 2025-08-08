import React, { useState } from "react";
import Header2 from "./Header2";
import SubHeader from "./SubHeader";
import SetP from "./SetP";
import SubmitButton from "./SubmitButton";
import { userService } from "../../../services/user";

export default function Cars({ plate }) {
  const [show, setShow] = useState(false);
  const [plateInput, setPlateInput] = useState("");

  const handleClick = () => setShow((prev) => !prev);

  const handleSubmit = async () => {
    const plateList = plateInput
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p);

    const res = await userService.addCars({ plate_numbers: plateList });
    if (res.response === 0) {
      const updatedPlates = res.data.map((item) => item.plate_number);
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        parsedUser.cars = res.data;

        localStorage.setItem("userInfo", JSON.stringify(parsedUser));
      }
      console.log(updatedPlates);
      setPlateInput(updatedPlates.join(", "));
      setShow(false);
    }

    setShow(false);
  };
  return (
    <div className="flex flex-col w-full h-[155px] rounded-[12px] p-[20px] gap-[7px] bg-[#FFFFFF]">
      <Header2 icon="/ndai.svg" text={"Cars"} />
      <div className="flex flex-col w-full h-[178px] gap-[10px]">
        <div className="flex flex-col w-full h-[84px] py-[4px] gap-[4px]">
          <div className="flex flex-row w-full h-[31px] justify-between">
            <SubHeader icon="/plate.svg" text={"License Plate"} />

            <div className="flex items-center gap-3">
              <SetP text={show ? "Cancel" : "Edit"} callback={handleClick} />
              {show && <SubmitButton callback={handleSubmit} />}
            </div>
          </div>
          <input
            type="text"
            value={plateInput}
            onChange={(e) => setPlateInput(e.target.value)}
            readOnly={!show}
            placeholder={plate || "XXX ###X, XXX ###X"}
            className="w-full h-[46px] rounded-[12px] border-[1px] p-[10px] gap-[10px] border-[#00000080]"
          />
        </div>
      </div>
    </div>
  );
}
