import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';


import { TbNorthStar } from 'react-icons/tb';

import { IoFastFoodSharp } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import { BiBuildingHouse } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';

import { ActionIcon } from '@mantine/core';

export enum CategoriaEnum {
  ALIMENTACAO = 'ALIMENTACAO',
  MORADIA = 'MORADIA',
  PAGAMENTO = 'PAGAMENTO',
  OUTROS = 'OUTROS',
}

export enum TipoTransacaoEnum {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
}

export enum StatusEnum {
  EFETIVADA = 'EFETIVADA',
  PENDENTE = 'PENDENTE',
}

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

export function getStatus(value: string) {
  return {
    EFETIVADA: StatusEnum.EFETIVADA,
    PENDENTE: StatusEnum.PENDENTE,
  }[value];
}

export function getTipo(value: string) {
  return {
    RECEITA: TipoTransacaoEnum.RECEITA,
    DESPESA: TipoTransacaoEnum.DESPESA,
  }[value];
}

export function getCategoria(value: string) {
  return {
    ALIMENTACAO: CategoriaEnum.ALIMENTACAO,
    MORADIA: CategoriaEnum.MORADIA,
    PAGAMENTO: CategoriaEnum.PAGAMENTO,
    OUTROS: CategoriaEnum.OUTROS,
  }[value];
}

export function getCategoriaIcon(categoria: string, isActive: StatusEnum) {

  return {

    ALIMENTACAO: (
      <ActionIcon
        color="red"
        size={60}
        radius="xl"
        variant={isActive === StatusEnum.EFETIVADA ? 'outline' : 'default'}
        style={{ cursor: 'default' }}
      >
        <IoFastFoodSharp size={45} />
      </ActionIcon>
    ),
    MORADIA: (
      <ActionIcon
        color="blue"
        size={60}
        radius="xl"
        variant={isActive ? 'outline' : 'default'}
        style={{ cursor: 'default' }}
      >
        <BiBuildingHouse size={45} />
      </ActionIcon>
    ),
    PAGAMENTO: (
      <ActionIcon
        color="green"
        size={60}
        radius="xl"
        variant={isActive ? 'outline' : 'default'}
        style={{ cursor: 'default' }}
      >
        <GiMoneyStack size={45} />
      </ActionIcon>
    ),
    OUTROS: (
      <ActionIcon
        color="gray"
        size={60}
        radius="xl"
        variant={isActive ? 'outline' : 'default'}
        style={{ cursor: 'default' }}
      >
        <BsStars size={45} />
      </ActionIcon>
    ),
  }[categoria];
  
}
