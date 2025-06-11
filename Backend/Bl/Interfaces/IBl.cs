using Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces;

public interface IBl
{
    IDal Dal { get; }
    ICategoryServiceBl CategoryService { get; }
    ISubCategoryServiceBl SubCategoryService { get; }
    IUserServiceBl UserService { get; }
    IPromptServiceBl PromptService { get; }
}
