using Dal.Data;
using Dal.Interfaces;
using Dal.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public class DalManager:IDal
{
    public ApplicationDbContext Context { get; }
    public ICategoryService CategoryService { get; }
    public ISubCategoryService SubCategoryService { get; }
    public IUserService UserService { get; }
    public IPromptService PromptService { get; }

    public DalManager(ApplicationDbContext dbContext)
    {
        Context = dbContext;
        CategoryService = new CategoryService(this);
        SubCategoryService = new SubCategoryService(this);
        UserService = new UserService(this);
        PromptService = new PromptService(this);

        //ServiceCollection service = new();
        //service.AddScoped<ICategoryService, CategoryService>();
        //service.AddScoped<IUserService, UserService>();
        //service.AddScoped<IPromptService,PromptService>();
        //service.AddScoped<ISubCategoryService,SubCategoryService>();

        //ServiceProvider provider = service.BuildServiceProvider();
        //CategoryService = provider.GetRequiredService<ICategoryService>();
        //SubCategoryService = provider.GetRequiredService<ISubCategoryService>();
        //UserService = provider.GetRequiredService<IUserService>();
        //PromptService = provider.GetRequiredService<IPromptService>();
    }
}
