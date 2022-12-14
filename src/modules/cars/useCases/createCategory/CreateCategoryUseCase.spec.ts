import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { InMemoryCategoriesRepository } from "../../repositories/in-memory/InMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: InMemoryCategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});
