import { Carousel } from "flowbite-react";

const carouselItem = [
  {
    image:
      "https://static.theceomagazine.net/wp-content/uploads/2019/12/12082634/aston-valhalla.jpg",
    title: "Luxury Cars",
    description:
      "Explore our collection of luxury cars and experience unparalleled comfort and performance.",
    buttonTitle: "View Collection",
  },
  {
    image: "https://cdn.wallpapersafari.com/67/35/AeaFvR.jpg",
    title: "Electric Vehicles",
    description:
      "Discover the future of transportation with our electric vehicle lineup. Go green, go electric!",
    buttonTitle: "Explore EVs",
  },
  {
    image:
      "https://www.edmunds.com/assets/m/cs/blt8928d999e34a98ca/65834161b782f01486583824/2024_kia_ev9_front_1600.jpg",
    title: "Classic Cars",
    description:
      "Experience the nostalgia and elegance of classic cars from different eras. Timeless beauty, timeless style.",
    buttonTitle: "Discover Classics",
  },
];

export default function HeroSectionComponent() {
  return (
    <div className="relative h-screen overflow-hidden rounded-none mt-[-5%]">
      <Carousel>
        {carouselItem.map((item, index) => (
          <div
            key={index}
            className="flex h-full items-center justify-center"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.8",
            }}
          >
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">{item.title}</h1>
              <p className="text-lg md:text-xl mt-4">{item.description}</p>
             

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
