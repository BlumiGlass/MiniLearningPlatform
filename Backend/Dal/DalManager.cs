using Dal.Data;
using Dal.Interfaces;
using Dal.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public class DalManager : IDal
{
    public ApplicationDbContext Context { get; }
    public ICategoryService CategoryService { get; }
    public ISubCategoryService SubCategoryService { get; }
    public IUserService UserService { get; }
    public IPromptService PromptService { get; }

    public DalManager()
    {
        ServiceCollection service = new();
        service.AddDbContext<ApplicationDbContext>(options => {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.AddJsonFile("appsettings.json")
            .Build();
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });
        service.AddSingleton<IConfigurationBuilder, ConfigurationBuilder>();
        service.AddScoped<ApplicationDbContext>();
        service.AddScoped<ICategoryService, CategoryService>();
        service.AddScoped<IUserService, UserService>();
        service.AddScoped<IPromptService, PromptService>();
        service.AddScoped<ISubCategoryService, SubCategoryService>();

        ServiceProvider provider = service.BuildServiceProvider();
        Context = provider.GetRequiredService<ApplicationDbContext>();
        CategoryService = provider.GetRequiredService<ICategoryService>();
        SubCategoryService = provider.GetRequiredService<ISubCategoryService>();
        UserService = provider.GetRequiredService<IUserService>();
        PromptService = provider.GetRequiredService<IPromptService>();
    }
}
