import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';

interface NotificationProps {
  type: TypeNotificationEnum;
  title?: string;
}

export enum TypeNotificationEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface ObjectKeys {
  [key: string]: any;
}

export function notify({ type, title }: NotificationProps) {
  const dataNotification: ObjectKeys = {
    error: {
      color: 'red',
      title: 'Alguma coisa deu errado, por favor tente novamente',
      autoClose: 2000,
      icon: <BiErrorCircle />,
    },
    success: {
      color: 'green',
      title: 'Cadastro concluído com sucesso',
      autoClose: 2000,
      icon: <AiOutlineCheckCircle />,
    },
  };

  return {
    ...dataNotification[type],
    title: title || dataNotification[type].title,
  };
}
