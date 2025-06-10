using Dal.Data;
using Dal.Interfaces;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public class DalManager:IDal
{
    public ApplicationDbContext Context { get; }
    public ICategoryService CategoryService { get; }
    public ISubCategoryService SubCategoryService { get; }
    public IUserService UserService { get; }
    public IPromptService PromptService { get; }

    public DalManager()
    {
        ServiceCollection service = new();

        service.AddSingleton<ApplicationDbContext>();
        service.AddSingleton<ICategoryService, CategoryService>();
        service.AddSingleton<IUserService, UserService>();
        service.AddSingleton<IPromptService,PromptService>();
        service.AddSingleton<ISubCategoryService,SubCategoryService>();

        ServiceProvider provider = service.BuildServiceProvider();
        Context = provider.GetRequiredService<ApplicationDbContext>();
        CategoryService = provider.GetRequiredService<ICategoryService>();
        SubCategoryService = provider.GetRequiredService<ISubCategoryService>();
        UserService = provider.GetRequiredService<IUserService>();
        PromptService = provider.GetRequiredService<IPromptService>();
    }
}
