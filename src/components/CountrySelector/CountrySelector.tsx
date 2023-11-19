import { changeActiveCountry } from '../../slices/countrySlice';
import { useDispatch } from 'react-redux';

export enum Countries {
  Poland = 'Poland',
  CzechRepublic = 'Czech Republic',
  Slovakia = 'Slovakia',
  Romania = 'Romania',
  Hungary = 'Hungary',
  Austria = 'Austria',
  Belgium = 'Belgium',
  Denmark = 'Denmark',
  Estonia = 'Estonia',
  Lithuania = 'Lithuania',
  Latvia = 'Latvia',
  Germany = 'Germany',
  Netherlands = 'Netherlands',
  Luxembourg = 'Luxembourg',
  Finland = 'Finland',
  France = 'France',
  Ireland = 'Ireland',
  Slovenia = 'Slovenia',
  Sweden = 'Sweden',
  Bulgaria = 'Bulgaria',
  Spain = 'Spain',
  Portugal = 'Portugal',
  Italy = 'Italy',
  Croatia = 'Croatia',
  Greece = 'Greece',
}

interface CountrySelectorProps {
  onSelect: (event: Countries) => void;
  selected: Countries | '';
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect, selected }) => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as Countries;

    const findIndexByValue = (value: Countries): number => {
      const keys = Object.keys(Countries) as (keyof typeof Countries)[];

      return keys.findIndex((key) => Countries[key] === value);
    };

    const index = findIndexByValue(selectedValue);

    const switchCountry = (index: number): string => {
      switch (true) {
        case index > 0 && index < 5:
          return "1";
        case index >= 5 && index < 12:
          return "2";
        case index === 12 || index === 13:
          return "3";
        case index >= 14 && index < 19:
          return "4";
        case index >= 19 && index < 22:
          return "5";
        case index === 22:
          return "6";
        case index === 23:
          return "7";
        case index === 24:
          return "8";
        default:
          return "0";
      }
    };

    const currentCountryGroupIndex = switchCountry(index);

    dispatch(changeActiveCountry(currentCountryGroupIndex));

    onSelect(selectedValue);
    localStorage.setItem('activeCountry', currentCountryGroupIndex.toString());
    localStorage.setItem('currentCountry', selectedValue);
  };

  return (
    <select value={selected} onChange={handleChange}>
      <option value="" disabled>
        Оберіть країну
      </option>
      {Object.values(Countries).map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
