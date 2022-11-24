import { MigrationInterface, QueryRunner, Table } from 'typeorm';

enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  META = 'META',
}

export class CreateTransacaoTable1644268019887 implements MigrationInterface {
  private tableName = 'transacao';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
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
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tipo',
            type: 'enum',
            enum: Object.values(TipoTransacao),
          },
          {
            name: 'parcelado',
            type: 'boolean',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
