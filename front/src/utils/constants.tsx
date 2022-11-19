import { MdAttachMoney, MdDirectionsBike } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';

import { BiBuildingHouse, BiCategory, BiHome } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import { GiMoneyStack, GiStairsGoal } from 'react-icons/gi';
import { IoFastFoodSharp, IoGameController } from 'react-icons/io5';
import { FaGamepad } from 'react-icons/fa';

import { ThemeIcon } from '@mantine/core';
import { CategoriaResponse } from '../services/categoria';
import { ReactNode } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { HiDesktopComputer } from 'react-icons/hi';

export enum CategoriaEnum {
  ALIMENTACAO = 'ALIMENTACAO',
  MORADIA = 'MORADIA',
  PAGAMENTO = 'PAGAMENTO',
  OUTROS = 'OUTROS',
}

export enum TipoTransacaoEnum {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  META = 'META',
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
    ['ALIMENTACAO']: <IoFastFoodSharp size={sizeIcon} color={color} />,
    ['MORADIA']: <BiBuildingHouse size={sizeIcon} color={color} />,
    ['PAGAMENTO']: <GiMoneyStack size={sizeIcon} color={color} />,
    ['OUTROS']: <BsStars size={sizeIcon} color={color} />,
    ['META']: <GiStairsGoal size={sizeIcon} color={color} />,
    ['CUSTOM']: <BiCategory size={sizeIcon} color={color} />,
    ['VIDEO-GAME']: <FaGamepad size={sizeIcon} color={color} />,
    ['VIDEO-GAME2']: <IoGameController size={sizeIcon} color={color} />,
    ['BIKE']: <MdDirectionsBike size={sizeIcon} color={color} />,
    ['CARRO']: <AiFillCar size={sizeIcon} color={color} />,
    ['CASA']: <BiHome size={sizeIcon} color={color} />,
    ['COMPUTADOR']: <HiDesktopComputer size={sizeIcon} color={color} />,
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
  {
    value: 'VIDEO-GAME',
    label: 'Video Game',
    icon: getSimpleIcon('VIDEO-GAME', 'black'),
  },
  {
    value: 'VIDEO-GAME2',
    label: 'Video Game',
    icon: getSimpleIcon('VIDEO-GAME2', 'black'),
  },
  {
    value: 'BIKE',
    label: 'Bike',
    icon: getSimpleIcon('BIKE', 'black'),
  },
  {
    value: 'CARRO',
    label: 'Carro',
    icon: getSimpleIcon('CARRO', 'black'),
  },
  {
    value: 'CASA',
    label: 'Casa',
    icon: getSimpleIcon('CASA', 'black'),
  },
  {
    value: 'COMPUTADOR',
    label: 'Computador',
    icon: getSimpleIcon('COMPUTADOR', 'black'),
  },
  {
    value: 'CUSTOM',
    label: 'Custom',
    icon: getSimpleIcon('CUSTOM', 'black'),
  },
];
