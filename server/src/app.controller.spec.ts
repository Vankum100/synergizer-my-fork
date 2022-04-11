import { Test } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { IHelloRespond } from "@synergizer/common";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return \"Hello World!\"", () => {
      expect(appController.getHello()).toStrictEqual(<IHelloRespond>{ message: "Hello world!" });
    });
  });
});
