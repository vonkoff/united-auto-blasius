import React from "react";
import { Racing_Sans_One } from "next/font/google";
import { Button } from "~/components/ui/button";

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
});

const address = "219 Congress Ave, Waterbury, Connecticut";
const encodedAddress = encodeURIComponent(address);
const mapUrl = `https://maps.google.com?q=${encodedAddress}`;

const AboutPage = () => {
  return (
    <div className="relative">
      <div className="h-64 overflow-hidden sm:h-80 md:h-96">
        <img
          className="w-full object-cover"
          src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/475985874_1431879738209967_8489022505602632927_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qw58xofPrbUQ7kNvgFFUkxl&_nc_oc=AdgUxfJ--vHKUWYMr0thmF7UoyfWFHwucaLX48YKBkGIw6PzrJoCd1XWK7adS_FBETYc8oWeWvQEzSZbfAY2F9u4&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=pWcuCZP-rJfvOX7-P7X9gQ&oh=00_AYHeevs3WD7DSolYYh5m96sUP_bwjntBRX6B4-n2cS9idg&oe=67DA53EE"
          alt="United Auto Sales & Service"
          width="1260"
          height="750"
          // style={{ objectPosition: "center bottom" }}
        />
        {/* <Image */}
        {/*   className="w-full object-cover" */}
        {/*   src='https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/475985874_1431879738209967_8489022505602632927_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qw58xofPrbUQ7kNvgFFUkxl&_nc_oc=AdgUxfJ--vHKUWYMr0thmF7UoyfWFHwucaLX48YKBkGIw6PzrJoCd1XWK7adS_FBETYc8oWeWvQEzSZbfAY2F9u4&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=pWcuCZP-rJfvOX7-P7X9gQ&oh=00_AYHeevs3WD7DSolYYh5m96sUP_bwjntBRX6B4-n2cS9idg&oe=67DA53EE' */}
        {/*   alt="United Auto Sales & Service" */}
        {/*   width={1260} */}
        {/*   height={750} */}
        {/*   priority */}
        {/*   style={{ objectPosition: "center bottom" }} */}
        {/* /> */}
      </div>
      <div className="container mx-auto p-6">
        <div className="relative -mt-16 flex justify-center">
          <div className="w-full max-w-4xl space-y-6 rounded-lg bg-slate-50 px-8 py-10 shadow-lg sm:px-20">
            <h1
              className={`${racingSansOne.className} text-center text-3xl sm:text-4xl md:text-5xl`}
            >
              About United Auto Sales & Service
            </h1>
            <p className="text-sm sm:text-base">
              For over 70 years, United Auto Sales & Service has been a trusted
              name in Waterbury, Connecticut. We understand that trust is
              earned, and we strive every day to earn yours. Our longevity in
              the industry is a testament to our commitment to customer service
              and our ability to meet all of our clients&apos; needs, from the
              purchase of a car to its maintenance and repair.
            </p>
            <p className="text-sm sm:text-base">
              At United Auto, we offer a wide variety of automotive services and
              repairs. All our work is performed using quality parts and
              equipment, and is carried out by technicians who are highly
              trained and certified. We pride ourselves on providing our
              customers with the best automotive repair experience possible,
              which includes excellent workmanship, superior service, and fair
              pricing.
            </p>
            <p className="text-sm sm:text-base">
              Our shop and staff are dedicated to ensuring that your experience
              with us exceeds your expectations. Whether you&apos;re looking to
              purchase a vehicle or need maintenance and repair services,
              we&apos;re here to meet all your automotive needs under one roof.
            </p>
            <p className="text-sm font-semibold sm:text-base">
              Give us a call or stop by our Waterbury location. Let us earn your
              business and your trust - we look forward to serving you and
              becoming your go-to automotive partner for years to come.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button asChild>
                <a href="tel:203-756-8851">Call Us 203-756-8851</a>
              </Button>
              <Button asChild variant="outline">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
