import { Table } from '@google-cloud/bigquery';
import { Injectable, Logger } from '@nestjs/common';
import { TransferResponse } from 'src/domain/repository/bigQuery-repository';

@Injectable()
export class TransferRowsService {
  private readonly logger = new Logger(TransferRowsService.name);

  async run(items: any[], table: Table): Promise<TransferResponse | null> {
    try {
      if (!table) {
        this.logger.error(
          'Nenhuma tabela encontrada no parametro para transferencia',
        );
        return null;
      }

      if (!items || items.length == 0) {
        this.logger.error('Payload vazio para inserção de dados');
        return null;
      }

      await table.insert(items);

      // When successful, return the table ID and the payload
      return {
        tableId: table.id,
        status: 'success',
        insertedPayload: items,
      };
    } catch (error) {
      if (error.name === 'PartialFailureError') {
        // Log or handle the rows that failed
        this.logger.error('Failed rows:', error.errors);

        return {
          tableId: table.id,
          status: 'partial_failure',
          errors: error.errors,
        };
      } else {
        this.logger.error(error);

        return {
          tableId: table.id,
          status: 'error',
          error: error.message,
        };
      }
    }
  }
}