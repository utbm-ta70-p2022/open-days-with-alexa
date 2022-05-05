import { ExampleModel } from '@libraries/lib-common';
import { EntityNotFoundError } from '@libraries/lib-nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamplesService {
  examples: ExampleModel[] = [
    {
      id: 'a',
      name: 'First example',
    },
    {
      id: 'b',
      name: 'Second example',
    },
    {
      id: 'c',
      name: 'Third example',
    },
  ];

  async retrieveOne(id: string): Promise<ExampleModel> {
    let example: ExampleModel;

    try {
      example = this.examples.find((_) => _.id === id);
      if (!example) {
        throw new EntityNotFoundError({ type: ExampleModel.constructor.name });
      }
    } catch (error) {
      throw new EntityNotFoundError({ originalError: error, type: ExampleModel.constructor.name });
    }

    return example;
  }
}
