import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMetaTable1668468220000 implements MigrationInterface {
  private tableName = 'meta';

  private transacaoFK = 'FK_META_ID_TRANSACAO';

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
            name: 'valor',
            type: 'numeric',
            scale: 2,
            precision: 10,
          },
          {
            name: 'progresso',
            type: 'numeric',
            scale: 2,
            precision: 10,
          },
          {
            name: 'prazo',
            type: 'integer',
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'data_inicio',
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
        name: this.transacaoFK,
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
