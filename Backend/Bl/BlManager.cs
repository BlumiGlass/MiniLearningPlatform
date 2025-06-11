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
    public BlManager(IDal dal)
    {
        Dal = dal;
        //real ai service
        //var configuration = new ConfigurationBuilder()
        //.AddJsonFile("appsettings.Development.json")
        //.Build();
        //aiService = new OpenAiService(new HttpClient(),configuration);
        //mock ai service
        aiService = new MockAiService();
        CategoryService = new CategoryServiceBl(Dal);
        SubCategoryService = new SubCategoryServiceBl(Dal);
        UserService = new UserServiceBl(Dal);
        PromptService = new PromptServiceBl(Dal, aiService);

        // ServiceCollection services = new ServiceCollection();
        //// services.AddSingleton<IDal, DalManager>();
        // services.AddScoped<ICategoryServiceBl, CategoryServiceBl>();
        // services.AddScoped<ISubCategoryServiceBl, SubCategoryServiceBl>();
        // services.AddScoped<IUserServiceBl, UserServiceBl>();
        // services.AddScoped<IPromptServiceBl, PromptServiceBl>();

        // ServiceProvider serviceProvider = services.BuildServiceProvider();
        // //Dal = serviceProvider.GetRequiredService<IDal>();
        // CategoryService = serviceProvider.GetRequiredService<ICategoryServiceBl>();
        // SubCategoryService = serviceProvider.GetRequiredService<ISubCategoryServiceBl>();
        // UserService = serviceProvider.GetRequiredService<UserServiceBl>();
        // PromptService = serviceProvider.GetRequiredService<PromptServiceBl>();
    }
}
