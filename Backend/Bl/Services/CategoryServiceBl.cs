using Bl.Interfaces;
using Bl.Models;
using Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services;

public class CategoryServiceBl : ICategoryServiceBl
{
    private readonly ICategoryService categoryService;
    public CategoryServiceBl(IDal dal)
    {
        categoryService = dal.CategoryService;
    }
    public List<CategoryBl> GetCategories()
    {
        return categoryService.ReadAll()
            .Select(c => new CategoryBl
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();
    }
}
