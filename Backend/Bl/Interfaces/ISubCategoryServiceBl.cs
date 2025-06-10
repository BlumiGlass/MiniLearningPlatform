using Bl.Models;

namespace Bl.Interfaces;

public interface ISubCategoryServiceBl
{
    List<SubCategoryBl> GetSubCategoriesByCategoryId(int categoryId);
}
