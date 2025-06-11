using Bl.Interfaces;
using Bl.Services;
using Dal;
using Dal.Interfaces;
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
    public BlManager()
    {
        ServiceCollection services = new ServiceCollection();
        services.AddSingleton<IDal, DalManager>();
        services.AddSingleton<ICategoryServiceBl, CategoryServiceBl>();
        services.AddSingleton<ISubCategoryServiceBl, SubCategoryServiceBl>();
        services.AddSingleton<IUserServiceBl, UserServiceBl>();
        services.AddSingleton<IPromptServiceBl, PromptServiceBl>();

        ServiceProvider serviceProvider = services.BuildServiceProvider();
        Dal = serviceProvider.GetRequiredService<IDal>();
        CategoryService = serviceProvider.GetRequiredService<ICategoryServiceBl>();
        SubCategoryService = serviceProvider.GetRequiredService<ISubCategoryServiceBl>();
        UserService = serviceProvider.GetRequiredService<UserServiceBl>();
        PromptService = serviceProvider.GetRequiredService<PromptServiceBl>();
    }
}
