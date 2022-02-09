import { createConnection, ConnectionOptions } from 'typeorm';
import ormconfig from '../../ormconfig';

interface TableInfo {
  entityName: string;
  tableName: string;
}

async function Main() {
  try {
    console.info(' ');
    console.info(`>>> Truncating the database "${process.env.POSTGRES_DB}"`);
    console.info(' ');

    const conn = await createConnection(ormconfig as ConnectionOptions);
    const repositories: TableInfo[] = [];

    conn.entityMetadatas.forEach(({ name, tableName }) => {
      repositories.push({ entityName: name, tableName });
    });

    console.info(' ');
    console.info(`>>> Loaded ${repositories.length} entities`);
    console.info(' ');

    for (const repository of repositories) {
      // eslint-disable-next-line no-await-in-loop
      const entity = await conn.getRepository(repository.entityName);
      // eslint-disable-next-line no-await-in-loop
      await entity.query(`TRUNCATE TABLE "${repository.tableName}" CASCADE`);
    }

    await conn.close();
  } catch (error) {
    console.error(error);
  }
}

Main();
