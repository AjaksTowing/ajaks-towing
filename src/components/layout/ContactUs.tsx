import Image from "next/image";
import ContactUsBackground from "../../../public/assets/images/6afa024839fd19274156129e486eca70727249fa-1920x540.webp";
import GetInTouchForm from "../GetInTouchForm";
import Bounded from "./Bounded";

export default async function ContactUs() {
  return (
    <div
      className="relative mt-16 overflow-hidden text-white md:mt-32"
      id="contact-us"
    >
      <div>
        <Bounded className="z-20 mt-1 flex flex-col items-center justify-evenly gap-10 py-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:top-0 md:mt-1 md:flex-row md:py-0 lg:gap-20">
          <div className="flex w-full flex-col gap-2 lg:justify-center lg:gap-4">
            <h3 className="text-2xl font-medium lg:text-5xl 2xl:text-6xl">
              Contact Us
            </h3>
            <p className="text-lg">
              If you have any questions, please fill out the form below and
              someone will get back with you in 24-48 hours. Thank you and we
              look forward to speaking with you soon.
            </p>
          </div>
          <GetInTouchForm />
        </Bounded>
      </div>
      <Image
        className="absolute bottom-0 left-0 right-0 top-0 -z-10 min-h-full w-screen object-cover md:relative md:min-h-[33rem]"
        placeholder="blur"
        src={ContactUsBackground}
        alt="Contact Us background Image"
      />
    </div>
  );
}
