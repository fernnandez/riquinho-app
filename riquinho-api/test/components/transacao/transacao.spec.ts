import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { typeOrmModule } from '../../helpers/typeorm';
import { TransacaoService } from '../../../src/transacao/services/transacao.service';

describe('trasacao', () => {
  let module: TestingModule;
  let component: TransacaoService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [typeOrmModule, AppModule],
    }).compile();

    component = module.get<TransacaoService>(TransacaoService);
  });

  afterAll(async () => {
    await module.close();
  });

  test('Deve retornar uma Transação especifica', async () => {
    // Given
    const id = 'b8ba79f9-13ca-49ab-85c4-40879c5f890c';

    // When
    const transacao = await component.findOne(id);

    // Then
    expect(transacao).toBeDefined();
    expect(transacao).toEqual(
      expect.objectContaining({
        id: 'b8ba79f9-13ca-49ab-85c4-40879c5f890c',
        titulo: '1° quinzena do sálario',
        descricao: null,
        data: new Date('2022-02-09 00:00:00.0000'),
        tipo: 'RECEITA',
        categoria: 'PAGAMENTO',
        status: 'EFETIVADA',
        valor: '1400.00',
      }),
    );
  });

  test('Deve retornar uma lista de Transações', async () => {});
});
