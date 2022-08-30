import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';

import { BiBuildingHouse, BiCategory } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { IoFastFoodSharp } from 'react-icons/io5';

import { ThemeIcon } from '@mantine/core';
import { CategoriaResponse } from '../../../../services/categoria';

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

export function getCategoriaSelectList(categorias: CategoriaResponse[]) {
  return categorias.map((categoria) => {
    return {
      value: categoria.id,
      label: categoria.nome,
      icon: getCategoriaIcon(categoria, StatusEnum.EFETIVADA, 35, 25),
    };
  });
}

export function getCategoriaIcon(
  categoria: CategoriaResponse,
  isActive: StatusEnum,
  sizeBg: number,
  sizeIcon: number
) {
  return {
    ALIMENTACAO: (
      <ThemeIcon
        size={sizeBg}
        radius="xl"
        variant={isActive === StatusEnum.EFETIVADA ? 'outline' : 'light'}
        style={{
          cursor: 'default',
          backgroundColor: categoria.color,
          border: 'none',
        }}
      >
        <IoFastFoodSharp size={sizeIcon} color="white" />
      </ThemeIcon>
    ),
    MORADIA: (
      <ThemeIcon
        size={sizeBg}
        radius="xl"
        variant={isActive ? 'outline' : 'filled'}
        style={{
          cursor: 'default',
          backgroundColor: categoria.color,
          border: 'none',
        }}
      >
        <BiBuildingHouse size={sizeIcon} color="white" />
      </ThemeIcon>
    ),
    PAGAMENTO: (
      <ThemeIcon
        size={sizeBg}
        radius="xl"
        variant={isActive ? 'outline' : 'filled'}
        style={{
          cursor: 'default',
          backgroundColor: categoria.color,
          border: 'none',
        }}
      >
        <GiMoneyStack size={sizeIcon} color="white" />
      </ThemeIcon>
    ),
    OUTROS: (
      <ThemeIcon
        size={sizeBg}
        radius="xl"
        variant={isActive ? 'outline' : 'filled'}
        style={{
          cursor: 'default',
          backgroundColor: categoria.color,
          border: 'none',
        }}
      >
        <BsStars size={sizeIcon} color="white" />
      </ThemeIcon>
    ),
    CUSTOM: (
      <ThemeIcon
        size={sizeBg}
        radius="xl"
        variant={isActive ? 'outline' : 'filled'}
        style={{
          cursor: 'default',
          backgroundColor: categoria.color,
          border: 'none',
        }}
      >
        <BiCategory size={sizeIcon} color="white" />
      </ThemeIcon>
    ),
  }[categoria.icon];
}
