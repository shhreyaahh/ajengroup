const realEstateProjects = [
  { id: "ashiana-residency", name: "Ashiana Residency", loc: "Patia, Bhubaneswar", desc: "A mid-rise residential development.", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80"], videos: [], specifications: [], partner: "", status: "" },
  { id: "green-court-apartments", name: "Green Court Apartments", loc: "Chandrasekharpur", desc: "Landscaped residential community.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"], videos: [], specifications: [], partner: "", status: "" },
  { id: "vista-business-park", name: "Vista Business Park", loc: "Infocity, Bhubaneswar", desc: "Commercial office development.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"], videos: [], specifications: [], partner: "", status: "" },
  { id: "amara-enclave", name: "Amara Enclave", loc: "Rasulgarh, Bhubaneswar", desc: "Gated residential enclave.", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"], videos: [], specifications: [], partner: "", status: "" },
];

const upcomingRealEstateProjects = [
  { name: "Utkal Heights", loc: "Chandaka, Bhubaneswar" },
  { name: "Riverfront Commons", loc: "Near Daya River" },
  { name: "The Lotus Residences", loc: "Patrapada, Bhubaneswar" },
];

window.realEstateProjects = realEstateProjects;
window.upcomingRealEstateProjects = upcomingRealEstateProjects;

const realEstateDetail = document.getElementById("realEstateDetail");

if (realEstateDetail) {
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = realEstateProjects.find((item) => item.id === projectId);

  if (project) {
    const byId = (id) => document.getElementById(id);
    const hero = byId("realEstateDetailHero");
    const facts = byId("realEstateDetailFacts");
    const gallery = byId("realEstateDetailGallery");
    const videos = byId("realEstateDetailVideos");

    byId("realEstateDetailName").textContent = project.name;
    byId("realEstateDetailLocation").textContent = project.loc;
    byId("realEstateDetailDescription").textContent = project.desc;
    hero.src = project.img;
    hero.alt = project.name;

    const optionalFacts = [
      ["realEstateDetailStatusRow", "realEstateDetailStatus", project.status],
      ["realEstateDetailPartnerRow", "realEstateDetailPartner", project.partner],
      ["realEstateDetailSpecificationsRow", "realEstateDetailSpecifications", project.specifications.join(", ")],
    ];

    optionalFacts.forEach(([rowId, valueId, value]) => {
      const row = byId(rowId);
      row.hidden = !value;
      byId(valueId).textContent = value;
    });

    facts.hidden = optionalFacts.every(([, , value]) => !value);

    const galleryImages = project.images.slice(1);
    gallery.hidden = galleryImages.length === 0;
    gallery.replaceChildren(
      ...galleryImages.map((image) => {
        const galleryImage = document.createElement("img");
        galleryImage.src = image;
        galleryImage.alt = project.name;
        galleryImage.loading = "lazy";
        return galleryImage;
      })
    );

    videos.hidden = project.videos.length === 0;
    videos.replaceChildren(
      ...project.videos.map((source) => {
        const video = document.createElement("video");
        video.controls = true;
        video.src = source;
        return video;
      })
    );
  }
}
