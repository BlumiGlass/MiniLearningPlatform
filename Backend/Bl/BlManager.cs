using Bl.Interfaces;
using Bl.Services;
using Dal;
using Dal.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl;

public class BlManager : IBl
{
    public IDal Dal { get; }
    public ICategoryServiceBl CategoryService { get; }
    public ISubCategoryServiceBl SubCategoryService { get; }
    public IUserServiceBl UserService { get; }
    public IPromptServiceBl PromptService { get; }
    public IAiService aiService { get; }
    public BlManager(IConfigurationBuilder configurationBuilder)
    {  
        ServiceCollection services = new ServiceCollection();
        services.AddScoped<IConfiguration>(conf =>
        {
            return configurationBuilder.AddJsonFile("appsettings.Development.json").Build();
        });
        services.AddHttpClient<IAiService, OpenAiService>();
        services.AddScoped<IDal, DalManager>();
        services.AddScoped<ICategoryServiceBl, CategoryServiceBl>();
        services.AddScoped<ISubCategoryServiceBl, SubCategoryServiceBl>();
        services.AddScoped<IUserServiceBl, UserServiceBl>();
        services.AddScoped<IPromptServiceBl, PromptServiceBl>();
        services.AddScoped<IAiService, OpenAiService>();

        ServiceProvider serviceProvider = services.BuildServiceProvider();
        Dal = serviceProvider.GetRequiredService<IDal>();
        CategoryService = serviceProvider.GetRequiredService<ICategoryServiceBl>();
        SubCategoryService = serviceProvider.GetRequiredService<ISubCategoryServiceBl>();
        UserService = serviceProvider.GetRequiredService<IUserServiceBl>();
        PromptService = serviceProvider.GetRequiredService<IPromptServiceBl>();
        aiService = serviceProvider.GetRequiredService<IAiService>();
    }
}
