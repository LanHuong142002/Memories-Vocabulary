// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

const cache = new Map();

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return [
    {
      id: 13,
      title: 'Let It Be',
      year: 1970,
    },
    {
      id: 12,
      title: 'Abbey Road',
      year: 1969,
    },
    {
      id: 11,
      title: 'Yellow Submarine',
      year: 1969,
    },
    {
      id: 10,
      title: 'The Beatles',
      year: 1968,
    },
    {
      id: 9,
      title: 'Magical Mystery Tour',
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: 'Revolver',
      year: 1966,
    },
    {
      id: 6,
      title: 'Rubber Soul',
      year: 1965,
    },
    {
      id: 5,
      title: 'Help!',
      year: 1965,
    },
    {
      id: 4,
      title: 'Beatles For Sale',
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: 'With The Beatles',
      year: 1963,
    },
    {
      id: 1,
      title: 'Please Please Me',
      year: 1963,
    },
  ];
}

async function getData(url: string) {
  if (url === '/the-beatles/albums') {
    return getAlbums();
  }

  if (url === '/the-beatles/bio') {
    return getBio();
  }

  throw Error('Not implemented');
}

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }

  return cache.get(url);
}
