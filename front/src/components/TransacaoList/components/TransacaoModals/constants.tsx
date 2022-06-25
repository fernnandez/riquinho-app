import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';

import { TbNorthStar } from 'react-icons/tb';

import { IoFastFoodSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BiBuildingHouse } from 'react-icons/bi';

export const CategoriaSelectItems = [
  {
    value: 'ALIMENTACAO',
    label: 'Alimentação',
    icon: <IoFastFoodSharp />,
  },
  {
    value: 'PAGAMENTO',
    label: 'Pagamentos',
    icon: <GiMoneyStack />,
  },
  {
    value: 'MORADIA',
    label: 'Modaria',
    icon: <BiBuildingHouse />,
  },
  {
    value: 'OUTROS',
    label: 'Outros',
    icon: <TbNorthStar />,
  },
];

export const TipoSelectItems = [
  { value: 'RECEITA', label: 'Receita', icon: <MdAttachMoney /> },
  {
    value: 'DESPESA',
    label: 'Despesa',
    icon: <TbCashBanknoteOff />,
  },
];
