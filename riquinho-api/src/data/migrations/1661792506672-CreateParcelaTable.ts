import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

enum Status {
  EFETIVADA = 'EFETIVADA',
  PENDENTE = 'PENDENTE',
}

export class CreateParcelaTable1661792506672 implements MigrationInterface {
  private tableName = 'parcela';

  private userFK = 'FK_PARCELA_ID_TRANSACAO';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(Status),
          },
          {
            name: 'valor',
            type: 'numeric',
            scale: 2,
            precision: 10,
          },
          {
            name: 'data',
            type: 'Date',
          },
          {
            name: 'transacao_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'Date',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'Date',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.userFK,
        columnNames: ['transacao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transacao',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
