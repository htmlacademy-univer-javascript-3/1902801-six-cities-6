import faker from 'faker';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthInfo } from '../types/auth';

export function makeMockOffer(): Offer {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    type: 'Apartment',
    price: faker.datatype.number({ min: 10, max: 1000 }),
    city: {
      name: 'Paris',
      location: { latitude: 48.85341, longitude: 2.3488, zoom: 12 },
    },
    location: {
      latitude: faker.datatype.float({ min: 48, max: 49 }),
      longitude: faker.datatype.float({ min: 2, max: 3 }),
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: faker.datatype.number({ min: 1, max: 5 }),
    previewImage: faker.internet.url(),
    images: [faker.internet.url()],
    description: faker.lorem.sentence(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
    goods: ['Wi-Fi'],
    host: {
      name: faker.name.findName(),
      avatarUrl: faker.internet.url(),
      isPro: false,
    },
  };
}
export function makeMockReview(): Review {
  return {
    id: faker.datatype.uuid(),
    user: {
      name: faker.name.findName(),
      avatarUrl: faker.internet.url(),
      isPro: false,
    },
    rating: faker.datatype.number({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    date: faker.date.past().toISOString(),
  };
}

export function makeMockAuthInfo(): AuthInfo {
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    avatarUrl: faker.internet.url(),
    isPro: false,
    token: faker.datatype.uuid(),
  };
}
