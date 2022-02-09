import { AppModule } from '../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { typeOrmModule } from '../../../data/typeorm';
import { TransacaoService } from '../../../transacao/services/transacao.service';

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
  });
});
