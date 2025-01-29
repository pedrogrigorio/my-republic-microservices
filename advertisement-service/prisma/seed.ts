import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const rules = [
  { tag: 'noSmoking', value: 'Proibido fumar' },
  { tag: 'noAlcohol', value: 'Proibido bebidas alcóolicas' },
  { tag: 'noParties', value: 'Proibido festas' },
  { tag: 'noPets', value: 'Proibido animais de estimação' },
  { tag: 'noNoiseAfter10', value: 'Proibido barulho após às 22h' },
  { tag: 'noUncleanAreas', value: 'Proibido deixar áreas comuns sujas' },
  { tag: 'noSharingKeys', value: 'Proibido compartilhar chaves' },
  { tag: 'noOvernightGuests', value: 'Proibido convidados pernoitarem' },
];

const amenities = [
  { tag: 'furnishedResidence', value: 'Residência mobiliada' },
  { tag: 'garage', value: 'Garagem' },
  { tag: 'airConditioning', value: 'Ar-condicionado' },
  { tag: 'swimmingPool', value: 'Piscina' },
  { tag: 'gym', value: 'Academia' },
  { tag: 'nearbyMarket', value: 'Mercado próximo' },
  { tag: 'laundry', value: 'Lavanderia' },
  { tag: 'publicTransportNearby', value: 'Transporte público próximo' },
];

async function getStates() {
  const response = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  );

  return response.data.map((state: any) => ({
    name: state.nome,
    uf: state.sigla,
  }));
}

async function getCities() {
  const response = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
  );
  const states = await prisma.state.findMany();

  return response.data.map((city: any) => ({
    name: city.nome,
    stateId: states.find(
      (state) => state.uf === city.microrregiao.mesorregiao.UF.sigla,
    )?.id,
  }));
}

async function main() {
  console.log('Seeding rules...');
  for (const rule of rules) {
    await prisma.rule.upsert({
      where: { tag: rule.tag },
      update: {},
      create: rule,
    });
  }

  console.log('Seeding amenities...');
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { tag: amenity.tag },
      update: {},
      create: amenity,
    });
  }

  console.log('Seeding states...');
  const states = await getStates();
  for (const state of states) {
    await prisma.state.upsert({
      where: { uf: state.uf },
      update: {},
      create: state,
    });
  }

  console.log('Seeding cities...');
  const cities = await getCities();
  for (const city of cities) {
    await prisma.city.upsert({
      where: {
        name_stateId: {
          name: city.name,
          stateId: city.stateId,
        },
      },
      update: {},
      create: city,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
