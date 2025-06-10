using Bl.Interfaces;
using Bl.Models;
using Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services;

public class SubCategoryServiceBl : ISubCategoryServiceBl
{
    private readonly ISubCategoryService subCategoryService;
    public SubCategoryServiceBl(IDal dal)
    {
        subCategoryService = dal.SubCategoryService;
    }
    public List<SubCategoryBl> GetSubCategoriesByCategoryId(int categoryId)
    {
        return subCategoryService.ReadByCategoryId(categoryId)
            .Select(sc => new SubCategoryBl
            {
                Id = sc.Id,
                Name = sc.Name,
                CategoryId = sc.CategoryId
            }).ToList();
    }
}
