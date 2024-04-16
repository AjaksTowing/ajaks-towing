"use client";
import SendEmail from "@/actions/sendEmail";
import { useEffect, useRef, useState } from "react";

export default function GetInTouchForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [emailMessage, setEmailMessage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    formRef.current?.reset();

    setTimeout(function () {
      setEmailMessage("Email Sent!");
    }, 500);
  };

  useEffect(
    function () {
      setTimeout(function () {
        setEmailMessage("");
      }, 500);
    },
    [emailMessage],
  );

  return (
    <form
      ref={formRef}
      className="flex w-full flex-col gap-3"
      action={SendEmail}
    >
      <input
        type="text"
        placeholder="Full Name"
        className="[#FFDDB5] w-full rounded border p-3 text-gray-700 outline-none ring-[#FFDDB5] focus:ring-2"
        name="name"
      />
      <input
        type="email"
        placeholder="Email"
        className="[#FFDDB5] w-full rounded border p-3 text-gray-700 outline-none ring-[#FFDDB5] focus:ring-2"
        name="email"
      />
      <input
        type="number"
        placeholder="Phone"
        className="[#FFDDB5] w-full rounded border p-3 text-gray-700 outline-none ring-[#FFDDB5] focus:ring-2"
        name="phone"
      />
      <input
        type="text"
        name="message"
        placeholder="Message"
        className="[#FFDDB5] min-h-32 w-full rounded border p-3 text-gray-700 outline-none ring-[#FFDDB5] focus:ring-2 "
      />
      <p>{emailMessage}</p>
      <button
        onClick={handleSubmit}
        disabled={emailMessage ? true : false}
        tabIndex={0}
        className="w-max min-w-36 rounded bg-[#DD841C] p-3 uppercase outline-none ring-[#FFDDB5] focus:ring-2 disabled:bg-[#DD841C80]"
      >
        SEND
      </button>
    </form>
  );
}
