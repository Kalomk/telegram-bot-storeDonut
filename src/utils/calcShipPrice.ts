interface ShipPriceType {
  under3: { eu: number; pl: number };
  upper3: { eu: number; pl: number };
  free: { eu: number; pl: number };
}

const activeCoutryFromLS = localStorage.getItem('activeCountry');
const rightCountryGroup = activeCoutryFromLS ? activeCoutryFromLS : '0';

const calculateZloty = (value: number) => {
  return parseFloat((value * 4.5).toString());
};

const selectShipGroup = (activeCountry: string): ShipPriceType => {
  switch (activeCountry) {
    case '0':
      return { under3: { eu: 4, pl: 17 }, upper3: { eu: 6, pl: 19 }, free: { eu: 28, pl: 125 } };
    case '1':
      return {
        under3: { eu: 5, pl: calculateZloty(5) },
        upper3: { eu: 8, pl: calculateZloty(8) },
        free: { eu: 80, pl: calculateZloty(80) },
      };
    case '2':
      return {
        under3: { eu: 16, pl: calculateZloty(16) },
        upper3: { eu: 18, pl: calculateZloty(18) },
        free: { eu: 180, pl: calculateZloty(180) },
      };
    case '3':
      return {
        under3: { eu: 16, pl: calculateZloty(16) },
        upper3: { eu: 23, pl: calculateZloty(23) },
        free: { eu: 230, pl: calculateZloty(230) },
      };
    case '4':
      return {
        under3: { eu: 23, pl: calculateZloty(23) },
        upper3: { eu: 23, pl: calculateZloty(23) },
        free: { eu: 230, pl: calculateZloty(230) },
      };
    case '5':
      return {
        under3: { eu: 23, pl: calculateZloty(23) },
        upper3: { eu: 27, pl: calculateZloty(27) },
        free: { eu: 230, pl: calculateZloty(230) },
      };
    case '6':
      return {
        under3: { eu: 25, pl: calculateZloty(25) },
        upper3: { eu: 27, pl: calculateZloty(27) },
        free: { eu: 270, pl: calculateZloty(270) },
      };
    case '7':
      return {
        under3: { eu: 27, pl: calculateZloty(27) },
        upper3: { eu: 27, pl: calculateZloty(27) },
        free: { eu: 270, pl: calculateZloty(270) },
      };
    case '8':
      return {
        under3: { eu: 34, pl: calculateZloty(34) },
        upper3: { eu: 34, pl: calculateZloty(34) },
        free: { eu: 270, pl: calculateZloty(270) },
      };
    default:
      return {
        under3: { eu: 17, pl: calculateZloty(17) },
        upper3: { eu: 19, pl: calculateZloty(19) },
        free: { eu: 340, pl: calculateZloty(340) },
      };
  }
};

export const calculateShip = (totalPrice: number, activePrice: 'zł' | '€', totalWeight: number) => {
  const shipPrice = selectShipGroup(rightCountryGroup)[totalWeight >= 3000 ? 'upper3' : 'under3'];
  const freeShip = selectShipGroup(rightCountryGroup).free;

  const rightShipPrice = activePrice === 'zł' ? shipPrice.pl : shipPrice.eu;

  const isRightFreeShip =
    (activePrice === 'zł' && totalPrice >= freeShip.pl) ||
    (activePrice === '€' && totalPrice >= freeShip.eu);

  return {
    shipPrice: isRightFreeShip ? 0 : rightShipPrice,
    freeShip: isRightFreeShip,
  };
};
