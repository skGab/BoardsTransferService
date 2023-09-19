import { BigQuery, Dataset } from '@google-cloud/bigquery';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CreateDatasetService {
  private readonly logger = new Logger(CreateDatasetService.name);
  private readonly location = 'southamerica-east1';

  async run(bigQuery: BigQuery, workspace: string): Promise<Dataset> {
    try {
      const dataset = bigQuery.dataset(workspace);
      const [exists] = await dataset.exists();

      if (!exists) {
        const [dataset] = await bigQuery.createDataset(workspace, {
          location: this.location,
        });

        console.log('Novo WorkSpace criado:', dataset.id);
        return dataset;
      }

      return dataset;
    } catch (error) {
      this.logger.error(error);
    }
  }
}