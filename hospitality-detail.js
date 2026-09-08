const hospitalityProperties = [
  {
    id: "cozy-city-escape",
    name: "Cozy City Escape",
    loc: "Nayapalli, Bhubaneswar",
    hero: "assets/hospitality/cozy-city-escape/01.jpeg",
    images: [
      "assets/hospitality/cozy-city-escape/01.jpeg",
    ],
    videos: [],
    about:
      "A quiet three-bedroom stay finished in warm stone and timber, designed for longer visits and family stays close to the city centre.",
    bedrooms: "3",
    guests: "6",
    amenities: [
      "Wi-Fi",
      "Kitchen",
      "Parking",
      "Air conditioning",
      "Power backup",
    ],
    booking: {
      url: "#",
    },
  },
  {
    id: "chilika-view-residence",
    name: "Chilika View Residence",
    loc: "Patia, Bhubaneswar",
    hero: "assets/hospitality/cozy-city-stay-2.0/01.jpeg",
    images: [
      "assets/hospitality/cozy-city-stay-2.0/01.jpeg",
    ],
    videos: [],
    about:
      "An airy two-bedroom apartment with a private balcony, ideal for short business stays and weekend visits.",
    bedrooms: "2",
    guests: "4",
    amenities: ["Wi-Fi", "Balcony", "Washing machine", "Air conditioning"],
    booking: {
      url: "#",
    },
  },
  {
    id: "konark-court-suites",
    name: "Konark Court Suites",
    loc: "Jaydev Vihar, Bhubaneswar",
    hero: "assets/hospitality/cozystay-basic/01.jpeg",
    images: [
      "assets/hospitality/cozystay-basic/01.jpeg",
    ],
    videos: [],
    about:
      "Serviced suites near the business district, combining hotel-style convenience with the comfort of a private home.",
    bedrooms: "1",
    guests: "2",
    amenities: ["Wi-Fi", "Housekeeping", "Elevator", "24/7 security"],
    booking: {
      url: "#",
    },
  },
  {
    id: "the-sandstone-villa",
    name: "The Sandstone Villa",
    loc: "Khandagiri, Bhubaneswar",
    hero: "assets/hospitality/luxe-cozy-city-1.0/01.jpeg",
    images: [
      "assets/hospitality/luxe-cozy-city-1.0/01.jpeg",
    ],
    videos: [],
    about:
      "A standalone villa with a private courtyard garden, suited to family gatherings and extended stays.",
    bedrooms: "4",
    guests: "8",
    amenities: ["Wi-Fi", "Garden", "Parking", "Kitchen", "Air conditioning"],
    booking: {
      url: "#",
    },
  },
];

const upcomingHospitalityProperties = [
  {
    name: "Daya Riverside Retreat",
    loc: "Near Daya River, Bhubaneswar",
    img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80",
  },
];

window.hospitalityProperties = hospitalityProperties;
window.upcomingHospitalityProperties = upcomingHospitalityProperties;

const hospitalityDetail = document.getElementById("hospitalityDetail");

if (hospitalityDetail) {
  const propertyId = new URLSearchParams(window.location.search).get("id");
  const property = hospitalityProperties.find((item) => item.id === propertyId);

  if (property) {
    const byId = (id) => document.getElementById(id);
    const hero = byId("hospitalityDetailHero");
    const amenities = byId("hospitalityDetailAmenities");
    const gallery = byId("hospitalityDetailGallery");
    const videos = byId("hospitalityDetailVideos");
    const booking = byId("hospitalityDetailBooking");

    byId("hospitalityDetailName").textContent = property.name;
  
    byId("hospitalityDetailDescription").textContent = property.about;
    byId("hospitalityDetailBedrooms").textContent = property.bedrooms;
    byId("hospitalityDetailGuests").textContent = property.guests;
    byId("hospitalityDetailFactLocation").textContent = property.loc;

    hero.src = property.hero;
    hero.alt = property.name;

    amenities.replaceChildren(
      ...property.amenities.map((item) => {
        const amenity = document.createElement("span");
        amenity.textContent = item;
        return amenity;
      }),
    );

    const galleryImages = property.images.slice(1);
    gallery.hidden = galleryImages.length === 0;
    gallery.replaceChildren(
      ...galleryImages.map((image) => {
        const galleryImage = document.createElement("img");
        galleryImage.src = image;
        galleryImage.alt = property.name;
        galleryImage.loading = "lazy";
        return galleryImage;
      }),
    );

    videos.hidden = property.videos.length === 0;
    videos.replaceChildren(
      ...property.videos.map((source) => {
        const video = document.createElement("video");
        video.controls = true;
        video.src = source;
        return video;
      }),
    );

    if (property.booking.url) {
      booking.href = property.booking.url;
    }
  }
}
