import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  icon: string;

  @Column()
  color: string;

  @Column({ name: 'is_for_receita' })
  isForReceita: boolean;

  @Column({ name: 'is_for_despesa' })
  isForDespesa: boolean;
}
