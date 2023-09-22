import { Injectable, Logger } from '@nestjs/common';
import { BoardVo } from 'src/domain/board/board-vo';

@Injectable()
export class UpdateItemsService {
  private readonly logger = new Logger(UpdateItemsService.name);

  // UPDATE ITEMS
  async run(payload: any[], board: BoardVo): Promise<any[] | null> {
    try {
      // if (!payload) return null;

      const itemIds = payload.map((item) => item.id_de_elemento);

      const query = `SELECT * FROM ${
        board.name
      } WHERE id_de_elemento IN (${itemIds.join(',')})`;

      // // Run the update queries
      // for (const query of updateQueries) {
      //   const [job] = await this.bigQueryClient.createQueryJob({
      //     query: query,
      //   });
      //   const [rows] = await job.getQueryResults();
      //   // Handle or log the results if needed
      // }

      console.log(query);
      // return { success: true, message: 'Updated successfully.' };
    } catch (error) {
      this.logger.error('Error updating items in BigQuery:', error);
      return null;
    }
  }
}