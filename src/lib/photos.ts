export type Photo = {
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
};

// Real, freely-licensed photos (Wikimedia Commons). Each credit links back
// to the file page for attribution. "lasalaPlaza" has no url - no Commons
// photo exists for that boutique hotel, so callers should fall back to the
// city photo instead.
export const PHOTOS: Record<string, Photo> = {
  madrid: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Puerta%20de%20Alcal%C3%A1,%20Madrid,%20Espa%C3%B1a,%202024-06-16,%20DD%2004.jpg",
    alt: "Puerta de Alcalá, Madrid",
    credit: "Diego Delso, delso.photo, CC BY-SA",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Puerta_de_Alcal%C3%A1,_Madrid,_Espa%C3%B1a,_2024-06-16,_DD_04.jpg",
  },
  sanSebastian: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/La%20Concha%20Beach%20as%20seen%20from%20Urgull.jpg",
    alt: "La Concha Bay, seen from Monte Urgull",
    credit: "Jchmrt, CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:La_Concha_Beach_as_seen_from_Urgull.jpg",
  },
  sanSebastianCalm2: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Amanecer%20-%20Playa%20de%20la%20Concha%20-%20San%20Sebastian%2006.jpg",
    alt: "Sunrise over Playa de la Concha, San Sebastián",
    credit: "Javier Pérez Montes, CC BY-SA 4.0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Amanecer_-_Playa_de_la_Concha_-_San_Sebastian_06.jpg",
  },
  bilbao: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Guggenheim%20Museum%20Bilbaos.jpg",
    alt: "Guggenheim Museum, Bilbao",
    credit: "RVsu, CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Guggenheim_Museum_Bilbaos.jpg",
  },
  fourSeasonsMadrid: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Galer%C3%ADa%20Canalejas,%20Madrid,%20Espa%C3%B1a,%202023-01-03,%20DD%2082.jpg",
    alt: "Galería Canalejas, home of the Four Seasons Hotel Madrid",
    credit: "Diego Delso, delso.photo, CC BY-SA",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Galer%C3%ADa_Canalejas,_Madrid,_Espa%C3%B1a,_2023-01-03,_DD_82.jpg",
  },
  meliaBilbao: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bilbao%20-%20Torre%20Iberdrola%20y%20Hotel%20Meli%C3%A1%202.jpg",
    alt: "Hotel Meliá Bilbao",
    credit: "Zarateman, CC0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Bilbao_-_Torre_Iberdrola_y_Hotel_Meli%C3%A1_2.jpg",
  },
  lasalaPlaza: {
    url: "",
    alt: "",
    credit: "",
    creditUrl: "",
  },
  basqueFood: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Barra%20de%20pintxos%20Donosti%2001.JPG",
    alt: "Pintxos bar, San Sebastián",
    credit: "Basotxerri, CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Barra_de_pintxos_Donosti_01.JPG",
  },
  basqueFood2: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pintxos%20de%20Bilbao.jpg",
    alt: "Pintxos close-up",
    credit: "Coralma*, CC BY-SA 4.0",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Pintxos_de_Bilbao.jpg",
  },
  madridTapas: {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tapas%20in%20Mercado%20de%20San%20Micuel%20in%20Madrid.jpg",
    alt: "Tapas at Mercado de San Miguel, Madrid",
    credit: "Sbharris, CC BY-SA 4.0",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Tapas_in_Mercado_de_San_Micuel_in_Madrid.jpg",
  },
};

export function getPhoto(key: string): Photo | undefined {
  const photo = PHOTOS[key];
  return photo && photo.url ? photo : undefined;
}

const CITY_PHOTO_FALLBACK: Record<string, string> = {
  lasalaPlaza: "sanSebastianCalm2",
};

export function getLodgingPhoto(hotelPhotoKey: string): Photo | undefined {
  return getPhoto(hotelPhotoKey) ?? getPhoto(CITY_PHOTO_FALLBACK[hotelPhotoKey] ?? "");
}
