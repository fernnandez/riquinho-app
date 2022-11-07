import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';

import { BiBuildingHouse, BiCategory } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { IoFastFoodSharp } from 'react-icons/io5';

import { ThemeIcon } from '@mantine/core';
import { CategoriaResponse } from '../../../../services/categoria';
import { ReactNode } from 'react';

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

export function getDataCategoriaIcon() {}

export function getCategoriaIcon(
  categoria: CategoriaResponse,
  isActive: StatusEnum,
  sizeBg: number,
  sizeIcon: number
): ReactNode {
  return (
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
      {getSimpleIcon(categoria.icon, 'white', sizeIcon)}
    </ThemeIcon>
  );
}

export function getSimpleIcon(
  icon: string,
  color: string,
  sizeIcon = 45
): ReactNode {
  return {
    ALIMENTACAO: <IoFastFoodSharp size={sizeIcon} color={color} />,
    MORADIA: <BiBuildingHouse size={sizeIcon} color={color} />,
    PAGAMENTO: <GiMoneyStack size={sizeIcon} color={color} />,
    OUTROS: <BsStars size={sizeIcon} color={color} />,
    CUSTOM: <BiCategory size={sizeIcon} color={color} />,
  }[icon];
}

export const iconList = [
  {
    value: 'ALIMENTACAO',
    label: 'Comida',
    icon: getSimpleIcon('ALIMENTACAO', 'black'),
  },
  {
    value: 'MORADIA',
    label: 'Casa',
    icon: getSimpleIcon('MORADIA', 'black'),
  },
  {
    value: 'PAGAMENTO',
    label: 'Dinheiro',
    icon: getSimpleIcon('PAGAMENTO', 'black'),
  },
  {
    value: 'OUTROS',
    label: 'Outros',
    icon: getSimpleIcon('OUTROS', 'black'),
  },
];
