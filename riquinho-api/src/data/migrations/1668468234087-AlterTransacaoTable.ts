import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTransacaoTable1668468234087 implements MigrationInterface {
  private tableName = 'transacao';

  private userFK = 'FK_TRANSACAO_ID_USER';

  private categoriaFK = 'FK_TRANSACAO_ID_CATEGORIA';

  private metaFK = 'FK_TRANSACAO_ID_META';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.tableName, [
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      }),

      new TableColumn({
        name: 'categoria_id',
        type: 'uuid',
        isNullable: false,
      }),

      new TableColumn({
        name: 'meta_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.userFK,
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.categoriaFK,
        columnNames: ['categoria_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categoria',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.metaFK,
        columnNames: ['meta_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'meta',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.userFK);

    await queryRunner.dropForeignKey(this.tableName, this.categoriaFK);

    await queryRunner.dropForeignKey(this.tableName, this.metaFK);

    await queryRunner.dropColumn(this.tableName, 'user_id');

    await queryRunner.dropColumn(this.tableName, 'categoria_id');

    await queryRunner.dropColumn(this.tableName, 'meta_id');
  }
}
