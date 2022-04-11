import { IHelloRespond } from '@synergizer/common';
import { IsString } from 'class-validator';

export class HelloRespondDto implements IHelloRespond {
  @IsString()
  readonly message!: string;
}
